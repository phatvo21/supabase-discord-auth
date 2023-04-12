import { FastifyReply } from 'fastify'
import { handleServerError } from '../helpers/errors'
import { STANDARD } from '../helpers/constants'

export const login = async (request: any, reply: FastifyReply): Promise<void> => {
  try {
    reply.code(STANDARD.SUCCESS).send({})
  } catch (err) {
    handleServerError(reply, err)
  }
}
