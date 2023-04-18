import { FastifyReply } from 'fastify'
import { handleServerError, initSupabaseClient, identityProvider } from 'helpers'
import {SupabaseClient} from '@supabase/supabase-js';

export const identityProviderStart = async (request: any, reply: FastifyReply): Promise<void> => {
  try {
    const {provider} = request.query;
    console.log(request.query);
    const {scopes} = identityProvider[provider];
    const supabaseClient: SupabaseClient = initSupabaseClient();

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: provider,
      options: {
        scopes
      }
    })

    reply.redirect(data.url as string);
  } catch (err) {
    handleServerError(reply, err);
  }
}
