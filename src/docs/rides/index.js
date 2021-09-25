const getRides = require('./get-rides');
const getRide = require('./get-ride');
const createRide = require('./create-ride');

module.exports = {
  paths: {
    '/rides': {
      ...getRides,
      ...createRide,
    },
    '/rides/{id}': {
      ...getRide,
    },
  },
};
