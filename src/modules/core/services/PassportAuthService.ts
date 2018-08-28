import { Service } from 'typedi';
import * as passport from 'passport';
import { NextFunction, Request, Response } from 'express';

@Service()
export class PassportAuthService {
    strategyAuthenticate(req: Request, res: Response, next: NextFunction): Promise<any> {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', {
                session: false
            }, (err, data) => {
                if (err) return reject(err);

                resolve(data);
            })(req, res);
        });
    }
}