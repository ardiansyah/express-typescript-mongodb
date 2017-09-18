import { IUserModel } from './interfaces/IUserModel';

class UserModel {
  private _model: IUserModel;

  constructor(userModel: IUserModel) {
    this._model = userModel;
  }

  get firstName(): string {
    return this._model.firstName;
  }

  get lastName(): string {
    return this._model.lastName;
  }

  get fulName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get address(): string {
    return this._model.address;
  }

  get email(): string {
    return this._model.email;
  }
}

export default UserModel;