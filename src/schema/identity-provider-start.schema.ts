import S from 'fluent-json-schema';

export const identityProviderStartSchema = {
  querystring: S.object().prop('provider', S.enum(['discord', 'google']).required()),
  response: {
    400: {
      type: 'object',
      description: 'Bad Request',
      properties: {
        statusCode: {type: 'number'},
        message: {type: 'string'},
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              message: {type: 'string'},
              params: {type: 'object', properties: {missingProperty: {type: 'string'}}},
            },
          },
        },
      },
      example: {
        statusCode: 400,
        message: 'BAD_REQUEST',
        data: [
          {
            message: "query should have required property 'provider'",
            params: {
              missingProperty: 'provider',
            },
          },
        ],
      },
    },
    500: {
      description: 'Server Error',
      type: 'object',
      properties: {
        statusCode: {type: 'number'},
        message: {type: 'string'},
      },
      example: {statusCode: 500, message: 'TRY_AGAIN'},
    },
  },
};
