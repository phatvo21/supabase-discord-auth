import {createClient, SupabaseClient} from '@supabase/supabase-js';

/**
 * Start the supabase client instance
 * @param {string} [key] - Indicates that the optional given key is Supabase JWT access token, the default is Anon Key
 * @return {SupabaseClient} - The created client instance
 */
export function initSupabaseClient(key?: string): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_SERVICE_URL ?? "";
  const supabaseKey = process.env.SUPABASE_ANON_KEY ?? "";

  return createClient(supabaseUrl, key ?? supabaseKey);
}