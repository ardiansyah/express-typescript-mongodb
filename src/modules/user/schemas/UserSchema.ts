// import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import { IUser } from '../interfaces/IUser';
import { Document, Schema, Model, Error, model } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

const bcrypt = require('bcrypt-nodejs');

export interface IUserModel extends IUser {
  // comparePassword(password: string): boolean;
  // comparePassword: (password: string) => boolean;
}

const schema: Schema = new Schema({
  firstName: {
    type: String,
    required: 'First name  is required'
  },
  lastName: {
    type: String,
    required: 'Last name  is required'
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// schema.plugin(passportLocalMongoose);

schema.pre('save', (next) => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }

  // if (!this.username) {
  //   const splitEmail = this.email.split('@');
  //   this.username = splitEmail[0];
  // }
  next();
});

/**
 * Password hash middleware.
 */
schema.pre<IUser>('save', function(next) {
  const user = this;
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, undefined, function (err: Error, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

schema.method({
  comparePassword(password: string) {
    if (bcrypt.compareSync(password, this.password)) return true;
    return false;
  }
});

const UserModel: Model<IUser> = model<IUser>('User', schema);


export default UserModel;
