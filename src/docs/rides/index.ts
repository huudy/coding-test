import getRides from './get-rides';
import getRide from './get-ride';
import createRide from './create-ride';

export default {
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
