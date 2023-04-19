import {FastifyInstance} from 'fastify';
import getUserRouter from 'routes/get-user.router';
import identityProviderStartRouter from 'routes/identity-provider-start.router';

const mainPrefix = 'api';

/**
 * Indicates that the router and prefix need to be registered
 */
interface RouterRegister {
  /** The name of router */
  routerName: any;
  /** which is the prefix name can be landing on */
  prefix: string;
}

/**
 * List all the exposed routes in the application
 * @return {Array<RouterRegister>} - Indicates the list of router's name and prefix
 */
export const routers: Array<RouterRegister> = [
  {routerName: identityProviderStartRouter, prefix: `${mainPrefix}/identity-provider`},
  {routerName: getUserRouter, prefix: `${mainPrefix}/users`},
];

/**
 * Register all the exposed routes to Fastify server
 * @param {FastifyInstance} server - The instance of Fastify server
 */
export function routerRegister(server: FastifyInstance): void {
  const listRouters: Array<RouterRegister> = routers;
  if (listRouters.length) {
    for (const router of listRouters) {
      const {routerName, prefix} = router;
      server.register(routerName, {prefix});
    }
  }
}
