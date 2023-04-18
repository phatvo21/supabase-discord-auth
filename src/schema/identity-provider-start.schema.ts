import S from 'fluent-json-schema'

export const identityProviderStartSchema = {
    querystring: S.object().prop("provider", S.enum(["discord", "google"]).required()),
}