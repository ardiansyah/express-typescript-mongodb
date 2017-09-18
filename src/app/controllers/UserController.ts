import UserService from '../services/UserService';
import { Request, Response } from 'Express';
import BaseController from './BaseController';
import { IUserModel } from '../models/interfaces/IUserModel';


export default class UserController extends BaseController {

  index (req: Request, res: Response): void {
    try {
      const userService = new UserService();
      userService.retrieve((error, result) => {
        if (error) res.send({ status: 'error' });
        else res.send({
          status: 'success',
          user: result
        });
      });
    } catch (e) {
      console.log(e);
      res.send({
        status: 'error',
        message: 'There is an error in your request'
      });
    }
  }

  create(req: Request, res: Response): void {
    try {
      const user: IUserModel = <IUserModel>req.body;
      const userService = new UserService();
      userService.create(user, (err, result) => {
        if (err) res.send({ status: 'error' });
        else res.send({
          status: 'success',
          user: result
        });
      });
    } catch (e) {
      console.log(e);
      res.send({
        status: 'error',
        message: 'There is an error in your request'
      });
    }
  }

  update(req: Request, res: Response): void {
    try {
      const user: IUserModel = <IUserModel>req.body;
      const id = req.params._id;
      const userService = new UserService();
      userService.update(id, user, (err, result) => {
        console.log(result);
        if (err) res.send({ status: 'error' });
        else res.send({
          status: 'success',
          user: result
        });
      });
    } catch (e) {
      console.log(e);
      res.send({
        status: 'error',
        message: 'There is an error in your request'
      });
    }
  }

  show (req: Request, res: Response): void {
    try {
      const userService = new UserService();
      const id = req.params._id;
      userService.findById(id, (err, result) => {
        if (err) res.send({ status: 'error' });
        else res.send({
          status: 'success',
          user: result
        });
      });
    } catch (e) {
      console.log(e);
      res.send({
        status: 'error',
        message: 'There is an error in your request'
      });
    }
  }

  delete (req: Request, res: Response): void {
    try {
      const userService = new UserService();
      const id = req.params._id;
      userService.delete(id, (err, result) => {
        if (err) res.send({ status: 'error' });
        else res.send({
          status: 'success',
          message: 'User has been deleted'
        });
      });
    } catch (e) {
      console.log(e);
      res.send({
        status: 'error',
        message: 'There is an error in your request'
      });
    }
  }
}

// export default UserController;