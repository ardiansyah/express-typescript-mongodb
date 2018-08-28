import { HttpError } from 'routing-controllers';
import * as httpStatus from 'http-status';

export class UserNotFoundError extends HttpError {
  constructor() {
    super(httpStatus.NOT_FOUND, 'User not found!');
  }
}
