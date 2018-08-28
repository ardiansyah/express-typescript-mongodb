import * as methodOverride from 'method-override';
import * as express from 'express';

export class MethodOverride {

  static configuration(): any {
    const app = express();
    app.use(methodOverride('X-HTTP-Method'));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(methodOverride('X-Method-Override'));
    app.use(methodOverride('_method'));
    return app;
  }
}