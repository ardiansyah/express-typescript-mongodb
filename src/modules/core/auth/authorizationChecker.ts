import { Container } from 'typedi';
import { AuthService } from '../../auth/services/AuthService';
import { Action, UnauthorizedError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import UserRepository from '../../user/repository/UserRepository';

export function authorizationChecker(): (action: Action, roles: any[]) => Promise<boolean> | boolean {

  const authService = Container.get<AuthService>(AuthService);
  const userrepository = Container.get<UserRepository>(UserRepository);

  return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
      // here you can use request/response objects from action
      // also if decorator defines roles it needs to access the action
      // you can use them to provide granular access check
      // checker must return either boolean (true or false)
      // either promise that resolves a boolean value
      // demo code:
      const token = await authService.parseTokenFromRequest(action.request);
      if (token === undefined) {
          // throw new UnauthorizedError();
          console.log('token :', token);
          return false;
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECREET);

      const user = await userrepository.findByField({
        email: decoded.email,
      });

      action.request.user = user;
      action.request.tokeninfo = user;

      return true;
  };
}