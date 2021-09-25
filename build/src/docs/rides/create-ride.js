"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Create ride operations'],
        description: 'Create ride',
        operationId: 'createRide',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/RideInput',
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Successful message',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Ride',
                        },
                    },
                },
            },
            400: {
                description: 'Bad request error message',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/BadRequestError',
                        },
                    },
                },
            },
            500: {
                description: 'Internal Server error',
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
