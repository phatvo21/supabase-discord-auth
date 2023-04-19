import {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {ERROR500, ERROR400, ERROR401, ERROR403} from '../constants';
import {ErrorOptions} from './error.types';

/**
 * Handle the global errors thrown by the application
 * @param {FastifyInstance} server - The server instance
 */
export function globalErrorHandler(server: FastifyInstance): void {
  server.setErrorHandler(
    (error: FastifyError & ErrorOptions, request: FastifyRequest, reply: FastifyReply): any => {
      // Log all the errors here
      // We can also use a logging mechanism like Elasticsearch Kibana to log the error here
      server.log.error({message: error?.message, hint: error?.hint, data: error?.data});

      // If there is a known error with status is 500 then we return the server error to the client
      if (error?.hint?.status === ERROR500.statusCode)
        return reply.status(ERROR500.statusCode).send(ERROR500);

      // If there is a validation error, then we return bad request error to the client
      if (error?.validation?.length) {
        const errorData = error.validation.map((validate) => {
          return {message: error?.message, params: validate?.params};
        });
        return reply.status(ERROR400.statusCode).send({...ERROR400, data: errorData});
      }

      // If there is an unauthorized error then we return error 401 to the client
      if (error?.hint?.status === ERROR401.statusCode)
        return reply.status(ERROR401.statusCode).send(ERROR401);

      // If there is a forbidden access error then we return error 403 to the client
      if (error?.hint?.status === ERROR403.statusCode)
        return reply.status(ERROR403.statusCode).send(ERROR403);

      // If there is unknown error then we return server error to the client
      if (error?.message) return reply.status(ERROR500.statusCode).send(ERROR500);
    },
  );
}
