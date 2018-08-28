import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class FinalMiddleware implements ExpressErrorMiddlewareInterface {

  public error(error: any, req: Request, res: Response, next?: NextFunction): void {
    if (!res.headersSent) {
      res.status(404);
      res.send(error);
    }

    res.end();
  }

}