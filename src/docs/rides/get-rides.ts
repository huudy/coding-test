export default {
  get: {
    tags: ['Get ride operations'],
    description: 'Get rides',
    operationId: 'getRides',
    parameters: [
      {
        name: 'page',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/page',
        },
        required: true,
        description: 'A page number of the rides',
      },
      {
        name: 'limit',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/limit',
        },
        required: true,
        description: 'A maximum value of rides to be retrieved by page',
      },
    ],
    responses: {
      200: {
        description: 'Succesful message',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PaginatedRides',
            },
          },
        },
      },
      404: {
        description: 'Not found error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NotFoundError',
            },
          },
        },
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ServerError',
            },
          },
        },
      },
    },
  },
};
