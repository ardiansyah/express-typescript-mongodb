import UserController from '../../app/controllers/UserController';
import { Router } from 'express';

class UserRouter {
  router: Router;
  private _userController: UserController;

  constructor() {
    this.router = Router();
    this._userController = new UserController();
  }

  get routes() {
    // const controller = this._userController;
    this.router.get('/user', this._userController.index);
    this.router.post('/user', this._userController.create);
    this.router.get('/user/:_id', this._userController.show);
    this.router.put('/user/:_id', this._userController.update);
    this.router.delete('/user/:_id', this._userController.delete);
    return this.router;
  }
}

export default UserRouter;