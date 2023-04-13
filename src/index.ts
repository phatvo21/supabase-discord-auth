import fastifyCors from '@fastify/cors';
import formBodyPlugin from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import fastify, {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import pino from 'pino';
import {routerRegister} from './helpers/router.register';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {DiscordAuth} from './services/DiscordAuth/discord.auth';

// Port, which is the exposed port application running
const port: number | string = process.env.PORT ?? 5000;
// Start Supabase client
const supabaseUrl = process.env.SUPABASE_SERVICE_URL ?? "";
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? "";

const startServer = async (): Promise<void> => {
  try {
    // Init the Fastify instance
    const server: FastifyInstance = fastify({
      logger: pino({level: 'info'}),
    });
    // Main plugins register
    server.register(formBodyPlugin);
    server.register(fastifyCors);
    server.register(fastifyHelmet);

    // Register all the routers
    routerRegister(server);

    // Error handlers
    server.setErrorHandler((error: FastifyError): void => {
      server.log.error(error);
    });

    server.get('/', (request: FastifyRequest, reply: FastifyReply): void => {
      reply.send({name: 'fastify-typescript'});
    });

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
    // const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'discord',
    // })
    // console.log(data);

    const token = await DiscordAuth.obtainToken("sLyrpxUsR9qqF2qauo98Bk66jkavb9");
    console.log(token);
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
