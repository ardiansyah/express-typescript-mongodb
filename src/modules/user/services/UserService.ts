import * as mongoose from 'mongoose';
import { Service, Container } from 'typedi';
import { IUser } from '../interfaces/IUser';
import IUserService from '../interfaces/IUserService';
import UserRepository from '../repository/UserRepository';

@Service()
export class UserService implements IUserService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  retrieve() {
    return this._userRepository.retrieve();
  }

  findById(_id: string) {
    this._userRepository.findById(_id);
  }

  create(item) {
    this._userRepository.create(item);
  }

  update(_id: mongoose.Types.ObjectId, item: IUser) {
    this._userRepository.update(_id, item);
  }

  delete(_id: string) {
    this._userRepository.delete(_id);
  }
}
