module.exports = {
  get: {
    tags: ['Get ride operations'],
    description: 'Get rides',
    operationId: 'getRides',
    parameters: [],
    responses: {
      200: {
        description: 'Succesful message',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArrayOfRides',
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
