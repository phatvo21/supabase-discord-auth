import {SupabaseClient} from '@supabase/supabase-js';
import {FastifyReply, FastifyRequest} from 'fastify';
import {
  initSupabaseClient,
  identityProvider,
  AppError,
  ERROR500,
  IdentityProviderType,
} from 'helpers';

const appUrl = process.env.CLIENT_APP_URL ?? 'http://localhost:3001';

/**
 * Allows user to start their login using identity provider flow
 */
export const identityProviderStart = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const {provider} = request.query as {
      /** list supported provider */
      provider: IdentityProviderType;
    };
    const {scopes} = identityProvider[provider];
    const supabaseClient: SupabaseClient = initSupabaseClient();

    const {data, error} = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: `${appUrl}`,
      },
    });

    if (error) throw new AppError({message: error.message, hint: {status: ERROR500.statusCode}});

    reply.redirect(data.url as string);
  } catch (err: any) {
    throw new AppError({message: err.message, hint: {status: ERROR500.statusCode}});
  }
};
