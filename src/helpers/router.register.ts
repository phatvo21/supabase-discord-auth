import {FastifyInstance} from 'fastify';
import postRouter from "../routes/post.router";
import userRouter from "../routes/user.router";

const mainPrefix: string = 'api';

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
  {routerName: postRouter, prefix: `${mainPrefix}/posts`},
  {routerName: userRouter, prefix: `${mainPrefix}/users`}
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
