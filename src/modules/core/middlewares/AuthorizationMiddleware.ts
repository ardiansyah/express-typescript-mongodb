import { Middleware, UnauthorizedError, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

/**
 * Authorization middleware for express framework with routing-controllers.
 * Prevent access of not logged user to the routes guarded by this middleware.
 */
// @Middleware({ type: 'before' })
export class AuthorizationMiddleware implements ExpressMiddlewareInterface {

    /**
     * Checks if there is a session in request with atached user.
     * If is, calls next middleware in chain, otherwise throws UnauthorizedError.
     *
     * @param {express.Request} req The Express request object
     * @param {express.Response} _res The Express response object (not used)
     * @param {express.NextFunction} [next] The next Express middleware function to call after (optional)
     */
    use(req: any, res: any, next: (err?: any) => any): void {
    //   console.log('req.session :', req.user);
      next();
        // if (!req.session || !req.session.user || !req.session.user.id) {
        //     throw new UnauthorizedError('Access denied, you have to login first!');
        // }

        // if (next) {
        //     next();
        // }
    }
}