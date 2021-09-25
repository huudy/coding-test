"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Get ride operations'],
        description: 'Get rides',
        operationId: 'getRides',
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/id',
                },
                required: true,
                description: 'A single ride id',
            },
        ],
        responses: {
            200: {
                description: 'Successful message',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Ride',
                        },
                    },
                },
            },
            404: {
                description: 'Not found error message',
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
