import * as mongoose from 'mongoose';
import UserRepository from '../repository/UserRepository';
import { IUserModel } from '../models/interfaces/IUserModel';
import IUserService from './interfaces/IUserService';

export default class UserService implements IUserService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  retrieve(callback: (error: any, result: any) => void) {
    this._userRepository.retrieve(callback);
  }

  findById(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.findById(_id, callback);
  }

  create(item: IUserModel, callback: (error: any, result: any) => void) {
    this._userRepository.create(item, callback);
  }

  update(_id: mongoose.Types.ObjectId, item: IUserModel, callback: (error: any, result: any) => void) {
    this._userRepository.update(_id, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.delete(_id, callback);
  }
}
