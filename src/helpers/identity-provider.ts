export interface IdentityProvider {
  discord: ProviderInfo
}

export interface ProviderInfo {
  scopes: string
}

/**
 * List supported identity providers
 */
export const identityProvider: any = {
  discord: {scopes: "identify email"}
}


export const IdentityProviderEnum: string[] = ["discord"]