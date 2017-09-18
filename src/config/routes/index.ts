import UserRouter from './UserRouter';
import * as express from 'express';

class Routes {
  public express: express.Application;
  public router: express.Router;

  constructor() {
    this.express = express();
    this.router = express.Router();
  }

  get routes() {
    const defaultRouter = this.router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!',
      });
    });

    this.express.use('/', defaultRouter);
    this.express.use('/api/', new UserRouter().routes);

    return this.express;
  }
}

export default Routes;