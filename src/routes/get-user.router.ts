import {FastifyInstance} from 'fastify';
import * as controllers from 'controllers';
import {checkValidUser} from 'helpers';
import {getUserSchema} from 'schema';

/**
 * Endpoint allows user fetch their information using given Supabase access token
 * */
async function getUserRouter(fastify: FastifyInstance): Promise<void> {
  fastify.decorateRequest('authUser', '');
  fastify.route({
    method: 'GET',
    url: '/user-info',
    schema: getUserSchema,
    handler: controllers.getUser,
    preHandler: [checkValidUser],
  });
}

export default getUserRouter;
