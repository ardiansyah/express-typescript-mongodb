import { Document } from 'mongoose';

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
}
