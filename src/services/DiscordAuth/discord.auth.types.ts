export interface ObtainedTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  scope: string;
}

export interface ObtainedTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
}