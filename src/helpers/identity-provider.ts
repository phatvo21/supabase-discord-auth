/** List supported provider */
export interface IdentityProvider {
  /** Discord provider */
  discord: ProviderInfo;
  /** Google provider */
  google: ProviderInfo;
}

/** The info contains list allows user grant the permission from provider */
export interface ProviderInfo {
  /** List scopes supported from provider */
  scopes: string;
}

/**
 * List supported identity providers
 */
export const identityProvider: IdentityProvider = {
  discord: {scopes: 'identify email'},
  google: {scopes: 'identify email'},
};

export type IdentityProviderType = 'discord' | 'google';
