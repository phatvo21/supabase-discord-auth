import {FastifyReply, FastifyRequest} from 'fastify';
import {AppError, ERROR500, STANDARD} from 'helpers';

/**
 * Allows to fetch user information from Supabase instance using JWT access token
 */
export const getUser = async (
  request: FastifyRequest | any,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const {id, email} = request['authUser'];
    reply.status(STANDARD.SUCCESS).send({id, email});
  } catch (err: any) {
    throw new AppError({message: err.message, hint: {status: ERROR500.statusCode}});
  }
};
