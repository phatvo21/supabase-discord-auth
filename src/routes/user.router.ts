import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'
async function userRouter(fastify: FastifyInstance): Promise<void> {
  fastify.decorateRequest('authUser', '')

  fastify.route({
    method: 'GET',
    url: '/login',
    schema: {},
    preHandler: [],
    handler: controllers.login,
  })
}

export default userRouter;
