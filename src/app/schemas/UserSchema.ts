import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import { IUserModel } from '../models/interfaces/IUserModel';
import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  createdAt: Date,
});

schema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

/**
 * Password hash middleware.
 */
schema.pre('save', function save(next) {
  const user = this;
  if (!this.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(this.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      this.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

const UserSchema = mongoose.model<IUserModel>('User', schema);

export default UserSchema;
