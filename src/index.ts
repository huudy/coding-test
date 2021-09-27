import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
import app from './app';
import logger from './utils/logger';

app.listen(port, () => {
  console.log('ready');

  logger.info(`App started and listening on port ${port}`);
});
