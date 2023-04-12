import { FastifyReply, FastifyRequest } from "fastify"
import { STANDARD } from "../helpers/constants"
import { handleServerError } from "../helpers/errors"
export const createPost = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        reply.status(STANDARD.SUCCESS).send({ data: "" })
    } catch (e) {
        handleServerError(reply, e)
    }
}