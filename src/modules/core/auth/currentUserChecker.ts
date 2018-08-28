import { Container } from 'typedi';
import { Action } from 'routing-controllers';
import { IUser } from '../../user/interfaces/IUser';
import UserRepository from '../../user/repository/UserRepository';

export function currentUserChecker(): (action: Action) => Promise<IUser | undefined> {
  const userrepository = Container.get<UserRepository>(UserRepository);

  return async function innerCurrentUserChecker(action: Action): Promise<IUser | undefined> {
    const tokeninfo = action.request.user;
    const user = await userrepository.findByField({
      email: tokeninfo.email,
    });
    if (user) {
        // console.info('Current user is ', user.toString());
    } else {
      // console.info('Current user is undefined');
    }

    return user;
  };
}