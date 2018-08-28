import { JsonController, Authorized, Get, CurrentUser, Res, Controller, Put, Body } from 'routing-controllers';
import { UserModel } from '../../user/models/UserModel';
import { ChangePasswordValidator } from '../validators/ChangePasswordValidator';
import UserRepository from '../../user/repository/UserRepository';
import { AuthService } from '../services/AuthService';
import { ChangeEmailValidator } from '../validators/ChangeEmailValidator';

@Authorized()
@JsonController('/profile')
export class ProfileController {

  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  @Get('/me')
  me(
    @CurrentUser() user: UserModel,
    @Res() res: any
  ): Promise<any> {
    try {
      return res.json(user);
    } catch (err) {
      return res.send(err);
    }
  }

  @Put('/change-password')
  async changePassword(
    @CurrentUser() currentUser: any,
    @Body() body: ChangePasswordValidator,
    @Res() res: any
  ) {
    try {
      const data = await this.authService.changePassword(body, currentUser);

      return res.json({
        message: 'Password has been successfully changed'
      });
    } catch (err) {
      return err;
    }
  }

  @Put('/change-email')
  async changeEmail(
    @CurrentUser() currentUser: any,
    @Body() body: ChangeEmailValidator,
    @Res() res: any
  ) {
    try {
      const user = await this.authService.changeEmail(body, currentUser);

      return res.json(user);
    } catch (err) {
      return err;
    }
  }
}