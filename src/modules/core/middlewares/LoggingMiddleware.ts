import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): void {
    // console.log(request.user);
    // console.log('response :', response);
    console.log(`${request.method} ${request.originalUrl}`);
    next();
  }
}
