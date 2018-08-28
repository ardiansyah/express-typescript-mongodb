import { ExpressErrorMiddlewareInterface, Middleware, HttpError, BadRequestError } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Express middleware to catch all errors throwed in controlers.
 * Should be first in error chain as it sends response to client.
 *
 * @export
 * @class CustomErrorHandler
 * @implements {ErrorMiddlewareInterface}
 */
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    /**
     * Error handler - sets response code and sends json with error message.
     * Handle: standard node error, HttpError, ValidationError and string.
     *
     * @param {any} error An throwed object (error)
     * @param {express.Request} req The Express request object
     * @param {express.Response} res The Express response object
     * @param {express.NextFunction} next The next Express middleware function
     */
    error(error: any, req: Request, res: Response, next: NextFunction): void {
        const responseObject = {} as any;

        // if its an array of ValidationError
        if (Array.isArray(error) && error.every((element) => element instanceof BadRequestError)) {
            console.log('error :', error);
            res.status(400);
            responseObject.message = `You have an error in your request's body. Check 'errors' field for more details!`;
            responseObject.errors = error;
            responseObject.details = [];
            error.forEach((element: ValidationError) => {
                Object.keys(element.constraints).forEach((type) => {
                    responseObject.details.push(`property ${element.constraints[type]}`);
                });
            });
        } else {
            // set http status
            if (error instanceof HttpError && error.httpCode) {
                res.status(error.httpCode);
            } else {
                res.status(500);
            }

            if (error instanceof Error) {
                const developmentMode: boolean = process.env.NODE_ENV === 'development';

                // set response error fields
                if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
                    responseObject.name = error.name;
                }
                if (error.message) {
                    responseObject.message = error.message;
                }
                if (error.stack && developmentMode) {
                    responseObject.stack = error.stack;
                }
            } else if (typeof error === 'string') {
                responseObject.message = error;
            }
        }

        // send json only with error
        res.json(responseObject);
    }
}