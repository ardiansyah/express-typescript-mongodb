import { HttpError } from 'routing-controllers';

export class ValidationError extends HttpError {
  message: any;
  name: string;
  constructor(message: any) {
    super(402);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.name = 'ValidationError';
    this.message = message;
  }
}