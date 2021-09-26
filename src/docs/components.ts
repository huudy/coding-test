export default {
  components: {
    schemas: {
      id: {
        type: 'number',
        description: 'An id of a ride',
        example: '23',
      },
      page: {
        type: 'number',
        description: 'Page number',
        example: '1',
      },
      limit: {
        type: 'number',
        description: 'Maximum values of rides to be retrieved per page',
        example: '10',
      },
      PaginatedRides: {
        type: 'object',
        properties: {
          page: {
            type: 'number',
            description: 'Page number',
            example: '1',
          },
          totalCount: {
            type: 'number',
            description: 'Total number of rides in the DB',
            example: '14',
          },
          totalPages: {
            type: 'number',
            description: 'total number of pages available',
            example: '3',
          },
          rides: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                rideID: {
                  type: 'number',
                  description: 'Ride identification number',
                  example: '100',
                },
                riderName: {
                  type: 'string',
                  description: "Rider's name",
                  example: 'Pablo',
                },
                driverName: {
                  type: 'string',
                  description: "Driver's name",
                  example: 'Hans',
                },
                driverVehicle: {
                  type: 'string',
                  description: 'vehicle model and name',
                  example: 'Toyota Yaris',
                },
                startLat: {
                  type: 'number',
                  description: 'Starting point latitude',
                  example: '43.232',
                },
                endLat: {
                  type: 'number',
                  description: 'Destination latitude',
                  example: '43.3232',
                },
                startLong: {
                  type: 'number',
                  description: 'Starting longitude',
                  example: '43.3232',
                },
                endLong: {
                  type: 'number',
                  description: 'Destination longitude',
                  example: '43.3232',
                },
                created: {
                  type: 'Date',
                  description: 'Creation date',
                  example: '2021-09-25 07:52:47',
                },
              },
            },
          },
        },
      },
      ArrayOfRides: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            rideID: {
              type: 'number',
              description: 'Ride identification number',
              example: '100',
            },
            riderName: {
              type: 'string',
              description: "Rider's name",
              example: 'Pablo',
            },
            driverName: {
              type: 'string',
              description: "Driver's name",
              example: 'Hans',
            },
            driverVehicle: {
              type: 'string',
              description: 'vehicle model and name',
              example: 'Toyota Yaris',
            },
            startLat: {
              type: 'number',
              description: 'Starting point latitude',
              example: '43.232',
            },
            endLat: {
              type: 'number',
              description: 'Destination latitude',
              example: '43.3232',
            },
            startLong: {
              type: 'number',
              description: 'Starting longitude',
              example: '43.3232',
            },
            endLong: {
              type: 'number',
              description: 'Destination longitude',
              example: '43.3232',
            },
            created: {
              type: 'Date',
              description: 'Creation date',
              example: '2021-09-25 07:52:47',
            },
          },
        },
      },
      Ride: {
        type: 'object',
        properties: {
          rideID: {
            type: 'number',
            description: 'Ride identification number',
            example: '100',
          },
          riderName: {
            type: 'string',
            description: "Rider's name",
            example: 'Pablo',
          },
          driverName: {
            type: 'string',
            description: "Driver's name",
            example: 'Hans',
          },
          driverVehicle: {
            type: 'string',
            description: 'vehicle model and name',
            example: 'Toyota Yaris',
          },
          startLat: {
            type: 'number',
            description: 'Starting point latitude',
            example: '43.232',
          },
          endLat: {
            type: 'number',
            description: 'Destination latitude',
            example: '43.3232',
          },
          startLong: {
            type: 'number',
            description: 'Starting longitude',
            example: '43.3232',
          },
          endLong: {
            type: 'number',
            description: 'Destination longitude',
            example: '43.3232',
          },
          created: {
            type: 'Date',
            description: 'Creation date',
            example: '2021-09-25 07:52:47',
          },
        },
      },
      RideInput: {
        type: 'object',
        properties: {
          rideID: {
            type: 'number',
            description: 'Ride identification number',
            example: '100',
          },
          riderName: {
            type: 'string',
            description: "Rider's name",
            example: 'Pablo',
          },
          driverName: {
            type: 'string',
            description: "Driver's name",
            example: 'Hans',
          },
          driverVehicle: {
            type: 'string',
            description: 'vehicle model and name',
            example: 'Toyota Yaris',
          },
          startLat: {
            type: 'number',
            description: 'Starting point latitude',
            example: '43.232',
          },
          endLat: {
            type: 'number',
            description: 'Destination latitude',
            example: '43.3232',
          },
          startLong: {
            type: 'number',
            description: 'Starting longitude',
            example: '43.3232',
          },
          endLong: {
            type: 'number',
            description: 'Destination longitude',
            example: '43.3232',
          },
        },
      },
      NotFoundError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Not found error message',
            example: 'Could not find any rides',
          },
          error_code: {
            type: 'string',
            description: 'Error internal code',
            example: 'RIDES_NOT_FOUND_ERROR',
          },
        },
      },
      ServerError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Internal server error message',
            example: 'Unknown error',
          },
          error_code: {
            type: 'string',
            description: 'Error internal code',
            example: 'SERVER_ERROR',
          },
        },
      },
      BadRequestError: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Bad request error message',
            example: 'Rider name must be a non empty string',
          },
          error_code: {
            type: 'string',
            description: 'Error internal code',
            example: 'VALIDATION_ERROR',
          },
        },
      },
    },
  },
};
