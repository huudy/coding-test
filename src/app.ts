import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import docs from './docs';
import ridesRoutes from './routes/ride.routes';
import healthRoutes from './routes/health.routes';

const specs = swaggerJsdoc(docs);
const app = express();

import dao from './db/dao';
dao.buildSchemas();

app.use(express.json());

app.use('/rides', ridesRoutes);
app.use('/health', healthRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;
