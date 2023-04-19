import S from 'fluent-json-schema';

export const getUserSchema = {
  headers: S.object().prop('authorization', S.string().required()),
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        id: {type: 'string'},
        email: {type: 'string'},
      },
      example: {id: 'userId', email: 'user@example.com'},
    },
    400: {
      description: 'Bad Request',
      type: 'object',
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
            message: "headers should have required property 'authorization'",
            params: {
              missingProperty: 'authorization',
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
