import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'
async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')

  fastify.route({
    method: 'GET',
    url: '/login',
    schema: {},
    handler: controllers.login,
  })
}

export default userRouter
