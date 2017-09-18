import * as express from 'express';
import * as bodyParser from 'body-parser';

import MethodOverride from '../MethodOverride';
import Routes from '../../routes';

class MiddlewareBase {

  static get configuration() {
    const app = express();
    app.use(bodyParser.json());
    app.use(MethodOverride.configuration());
    app.use(new Routes().routes);

    return app;
  }
}

export default MiddlewareBase;
