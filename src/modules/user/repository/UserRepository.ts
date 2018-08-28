import UserModel from '../schemas/UserSchema';
import BaseRepository from '../../core/repository/BaseRepository';
import { IUser } from '../interfaces/IUser';
import { Service, Container } from 'typedi';
import { ForbiddenError } from 'routing-controllers';

@Service()
export default class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  // async findAndGenerateToken (options) {
  //   const {email, password} = options;
  //   const user = this._model.findOne({ email }).exec();
  // }
}
