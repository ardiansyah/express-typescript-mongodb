import UserRepository from '../repository/UserRepository';
import { IUserModel } from '../models/interfaces/IUserModel';

export class AuthService {
  private _userRepository: UserRepository;

  register (user: IUserModel, callback: (error: any, result: any) => void) {
    this._userRepository.create(user, callback);
  }
}