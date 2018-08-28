import {
  Controller,
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Authorized,
  UseBefore,
  Req,
  CurrentUser,
  NotFoundError,
  HttpError,
  ForbiddenError
} from 'routing-controllers';
import UserRepository from '../repository/UserRepository';
import { IUser } from '../interfaces/IUser';
import { AuthorizationMiddleware } from '../../core/middlewares/AuthorizationMiddleware';
import { UserModel } from '../models/UserModel';
import { UserNotFoundError } from '../../core/exceptions/UserNotFoundError';
import { UserTransformer } from '../transformers/User';
import { Response } from 'express';

@Authorized()
@JsonController('/users')
export class UserController {

  constructor(
    private userRepository: UserRepository
  ) {}

  @Get('/')
  async index(
    @Res() res: Response,
    @Req() req: any
  ): Promise<any> {
    try {
      const user = await this.userRepository.retrieve();
      return res.json(user);
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }

  @Post('/')
  async create(
    @Body() user: UserModel,
    @Res() res: any
  ): Promise<IUser> {
    try {
      const createUser = await this.userRepository.create(user);
      console.log('create :', createUser);
      return res.json(createUser);
    } catch (error) {
      throw new ForbiddenError(error.message);
    }
  }

  @Get('/:id')
  async getById (
    @Param('id') id: string,
    @Res() res: any
  ): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(id);
      return res.json(user);
    } catch (error) {
      throw new UserNotFoundError();
    }
  }
}
