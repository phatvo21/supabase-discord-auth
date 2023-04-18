import { FastifyInstance } from 'fastify'
import * as controllers from 'controllers'
import {identityProviderStartSchema} from 'schema';
async function identityProviderStartRouter(fastify: FastifyInstance): Promise<void> {
  fastify.route({
    method: 'GET',
    url: '/start',
    schema: identityProviderStartSchema,
    handler: controllers.identityProviderStart,
  })
}

export default identityProviderStartRouter;
