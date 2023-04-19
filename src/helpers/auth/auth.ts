import {SupabaseClient} from '@supabase/supabase-js';
import {FastifyRequest, FastifyReply, DoneFuncWithErrOrRes} from 'fastify';
import {ERROR401} from '../constants';
import {AppError} from '../error-handler';
import {initSupabaseClient} from '../utils';
import {IUser} from './user.types';
export const checkValidUser = async (
  request: FastifyRequest | any,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
): Promise<void> => {
  try {
    const headerToken: any = request.headers.authorization;
    const token = headerToken.replace('Bearer ', '');

    if (!token) throwUnAuthenticatedError(ERROR401.message);

    const supabaseClient: SupabaseClient = initSupabaseClient();
    const {
      data: {user},
    } = (await supabaseClient.auth.getUser(token)) as {
      /** The data response from Supabase */
      data: {
        user: IUser;
      };
    };

    if (!user) throwUnAuthenticatedError(ERROR401.message);

    request.authUser = {id: user.id, email: user.email};
    done();
  } catch (err: any) {
    throwUnAuthenticatedError(err.message);
  }
};

export function throwUnAuthenticatedError(message: string): void {
  throw new AppError({message, hint: {status: ERROR401.statusCode}});
}
