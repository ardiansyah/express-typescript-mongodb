export class UserTransformer {

  firstName: string;

  lastName: string;

  username: string;

  email: string;

  address: string;

  password: string;

  getFullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}