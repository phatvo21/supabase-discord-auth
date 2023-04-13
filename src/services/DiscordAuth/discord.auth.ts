import {request} from '../../helpers/request';
import {ObtainedTokenData, ObtainedTokenResponse} from './discord.auth.types';
export const DiscordAuth = {
  /**
   *
   * @typedef {Object} obtainToken
   * @property {string} accessToken - The token that the application sends to authorize a Discord API request
   * @property {string} refreshToken - A token that you can use to obtain a new access token
   * @property {string} expiresIn - The remaining lifetime of the access token in seconds
   * @property {string} scope - The scopes of access granted by the access token expressed
   */
  /**
   * Obtain the tokens for a given code
   * @param {string} code - The authorization code
   * @throws {AppError}
   * @return {obtainToken} - The obtained token information
   */
  async obtainToken(code: string): Promise<ObtainedTokenResponse> {
    const clientSecret = process.env.DISCORD_CLIENT_SECRET ?? "";
    const clientId = process.env.DISCORD_CLIENT_ID ?? "";
    const redirectUrl = process.env.SUPABASE_REDIRECT_URI ?? "";

    try {
      const {
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
          scope,
        },
      } = await request<ObtainedTokenData>({
        baseURL: 'https://discord.com',
        url: '/api/oauth2/token',
        method: 'post',
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUrl,
          scope: 'identify'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      return {accessToken, refreshToken, expiresIn, scope};
    } catch (error) {
      // Handle invalid grant errors for the token exchange
      throw error;
    }
  },
};
