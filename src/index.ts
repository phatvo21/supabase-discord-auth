import * as console from 'console';
import fastifyCors from '@fastify/cors';
import formBodyPlugin from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import {fastifySwagger} from '@fastify/swagger';
import fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import pino from 'pino';
import {globalErrorHandler, routerRegister} from 'helpers';

// Port, which is the exposed port application running
const port: number | string = process.env.PORT ?? 5000;
const appHostName = process.env.APP_HOST_NAME ?? 'localhost:4001';

const startServer = async (): Promise<void> => {
  try {
    // Init the Fastify instance
    const server: FastifyInstance = fastify({
      logger: pino({level: 'info'}),
    });
    // Main plugins register
    server.register(formBodyPlugin);
    server.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    });
    server.register(fastifyCors, {
      origin: '*',
      methods: 'GET,PUT,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    });

    // Swagger configuration
    server.register(fastifySwagger, {
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'API Document',
          description: 'The list of API docs serves in the application',
          version: '0.1.0',
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Get more info here',
        },
        host: `${appHostName}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
      },
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      exposeRoute: true,
    });

    // Register all the routers
    routerRegister(server);

    // Error handlers
    globalErrorHandler(server);

    // Health check, which is the endpoint to check application status
    server.get(
      '/health-check',
      async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
          reply.status(200).send();
        } catch (e) {
          reply.status(500).send();
        }
      },
    );

    // Handle graceful shutdown
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(
          signal,
          async (): Promise<void> =>
            server.close().then((err: any): void => {
              console.log(`close application on ${signal}`);
              process.exit(err ? 1 : 0);
            }),
        );
      }
    }

    // Start listening the server
    await server.listen(port);
    await server.ready();
    server.swagger();
  } catch (e) {
    console.error(e);
  }
};

// Graceful shutdown if faced unhanded exception
process.on('unhandledRejection', (e): void => {
  console.error(e);
  process.exit(1);
});

startServer();
