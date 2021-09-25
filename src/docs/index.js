const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const rides = require('./rides');

module.exports = {
  definition: {
    ...basicInfo,
    ...servers,
    ...components,
    ...rides,
  },
  apis: ['/rides'],
};
