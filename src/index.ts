import DBConnection from './config/DBConnection';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Middlewares from './config/middlewares/base/MiddlewareBase';

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

/**
 * Connect to MongoDB.
 */
DBConnection.connect();

app.set('port', port);
app.use(Middlewares.configuration);

app.listen(port, () => {
    console.log(`Server API is running at localhost: ${port}`);
});