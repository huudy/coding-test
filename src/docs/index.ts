import basicInfo from './basicInfo';
import servers from './servers';
import components from './components';
import rides from './rides';
export default {
  definition: {
    ...basicInfo,
    ...servers,
    ...components,
    ...rides,
  },
  apis: ['/rides'],
};
