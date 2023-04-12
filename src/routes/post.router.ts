import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'

async function postRouter(fastify: FastifyInstance): Promise<void> {
    fastify.decorateRequest('authUser', '')
    fastify.route({
        method: 'POST',
        url: '/create',
        schema: {},
        preHandler: [],
        handler: controllers.createPost
    })
}

export default postRouter
