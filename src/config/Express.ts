import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as health from 'express-ping';
import * as morgan from 'morgan';
import * as glob from 'glob';

import { useExpressServer, useContainer, createExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { UserController } from '../modules/user/controllers/UserController';
import { AuthController } from '../modules/auth/controllers/AuthController';
import { setupLogging } from './Logging';
import { setupAuth } from './Authentication';
import { JwtStrategy } from '../modules/core/auth/JwtStrategy';
import * as passport from 'passport';
import * as winston from 'winston';
import { authorizationChecker } from '../modules/core/auth/authorizationChecker';
import { currentUserChecker } from '../modules/core/auth/currentUserChecker';
import { logger } from '../modules/core/common/logging';
import { setupSwagger } from './Swagger';
import { CustomErrorHandler } from '../modules/core/middlewares/CustomErrorHandler';
import { ProfileController } from '../modules/auth/controllers/ProfileController';
import { FinalMiddleware } from '../modules/core/middlewares/FinalMiddleware';

export class ExpressConfig {
  app: express.Express;

  constructor() {
    this.app = express();

    setupLogging(this.app);
    setupAuth(this.app);
    // setupSwagger(this.app);

    this.app.use(morgan('combined', {
      stream: winston.stream
    }));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(health.ping());

    // setup passport
    // this.app.use(passport.initialize());
    // new JwtStrategy();

    useContainer(Container);

    this.setupControllers();
  }

  setupControllers() {

    this.app = createExpressServer({
      routePrefix: '/api',
      classTransformer: true,
      controllers: [
        UserController,
        AuthController,
        ProfileController
      ],
      authorizationChecker: authorizationChecker(),
      currentUserChecker: currentUserChecker(),
      // defaultErrorHandler: false,
      middlewares: [
        CustomErrorHandler
      ],
      development: process.env.NODE_ENV === 'development' ? true : false
    });
  }
}