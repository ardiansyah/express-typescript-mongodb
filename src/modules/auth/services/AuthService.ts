const bcrypt = require('bcrypt-nodejs');
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { HttpCode, ForbiddenError, UnauthorizedError } from 'routing-controllers';

import UserRepository from '../../user/repository/UserRepository';
import { IUser } from '../../user/interfaces/IUser';
import { IUserModel } from '../../user/schemas/UserSchema';
import { ValidationError } from '../../core/exceptions/ValidationError';
import { UserNotFoundError } from '../../core/exceptions/UserNotFoundError';
import { PassportAuthService } from '../../core/services/PassportAuthService';
import { NextFunction, Request, Response } from 'express';

@Service()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private passportAuthService: PassportAuthService
  ) {}

  async login(options) {
    const {email, password} = options;
    const user: IUser = await this.userRepository.findByField({email});

    // if (!password) return new ValidationError('Password required');

    if (user && await user.comparePassword(password)) {
      const {email, username, id, firstName, lastName} = user;
      const { token, expires_in } = await this.createToken({
        email, id, username, firstName, lastName
      });
      return {
        user,
        token
      };
    }

    return new UserNotFoundError();
  }

  async register(payload) {
    try {
      const user: IUser = await this.userRepository.create(payload);

      const {email, username, id, firstName, lastName} = payload;
      const { token, expires_in } = await this.createToken({
        email, id, username, firstName, lastName
      });
      return {
        user,
        token
      };
    } catch (err) {
      throw new ForbiddenError(err.message);
    }
  }

  async createToken(user: any) {
    const expiresIn = process.env.JWT_EXPIRED || 60 * 60;
    const secretOrKey = process.env.JWT_SECREET;
    // const user = { username };
    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return { expires_in: expiresIn, token };
  }

  async validateUser(signedUser): Promise<boolean> {
    if (signedUser && signedUser.username) {
      return Boolean(await this.userRepository.findByField({
        email: signedUser.email
      }));
    }

    return false;
  }

  parseTokenFromRequest (req: Request): string | undefined {
    const authorization = req.header('authorization');

    // Retrieve the token form the Authorization header
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }

    return undefined;
  }

  async changePassword (payload, currentUser: IUser) {
    const {oldPassword, newPassword, confirmPassword} = payload;

    if (!currentUser.comparePassword(oldPassword)) {
      throw new ForbiddenError('Current password does not match');
    }

    if (currentUser.comparePassword(newPassword)) {
      throw new ForbiddenError('New password can not be the same with old password');
    }

    if (newPassword !== confirmPassword) {
      throw new ForbiddenError('confirm password must be the same with new Password');
    }

    const user = await this.userRepository._model.findById(currentUser.id);
    user.set({
      password: newPassword
    });
    user.save();
  }

  async changeEmail (payload, currentUser: IUser) {
    const user: IUser = await this.userRepository._model.findById(currentUser.id);
    user.set({
      email: payload.email
    });
    user.save();

    const { email, username, id, firstName, lastName } = user;
    const { token, expires_in } = await this.createToken({
      email, id, username, firstName, lastName
    });
    return {
      user,
      token
    };
  }
}