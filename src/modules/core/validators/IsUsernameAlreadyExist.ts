import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Container } from 'typedi';
import UserRepository from '../../user/repository/UserRepository';


@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(username: any, args: ValidationArguments) {
    const userRepository = Container.get<UserRepository>(UserRepository);
    return userRepository.findByField({
      username
    }).then(user => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint
    });
  };
}
