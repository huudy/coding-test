import express from 'express';
const app = express();
const port = 8010;

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

import { buildSchemas } from './schemas';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import docs from './docs';
const specs = swaggerJsdoc(docs);

db.serialize(() => {
  buildSchemas(db);

  const app = require('./src/app')(db);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  app.listen(port, () =>
    console.log(`App started and listening on port ${port}`)
  );
});
