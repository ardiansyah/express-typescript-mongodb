import { IUserModel } from '../models/interfaces/IUserModel';
import BaseRepository from './BaseRepository';
import UserSchema from '../schemas/UserSchema';


class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

export default UserRepository;