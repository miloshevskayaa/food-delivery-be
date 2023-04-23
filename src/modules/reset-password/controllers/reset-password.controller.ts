import { Body, Delete, Patch, Post } from '@nestjs/common';

import { ResetPasswordController as Controller } from '../decorators';
import { RestorePasswordDto } from '../dto';
import { RestorePasswordService } from '../services';

@Controller()
export class ResetPasswordController {
  constructor(private _restoreService: RestorePasswordService) {}

  @Post('check')
  sendMail(@Body() { email }: any) {
    console.log(email);

    return this._restoreService.sendMail(email);
  }

  @Delete('otp')
  otpCheck(@Body() { email, otp }: RestorePasswordDto) {
    return this._restoreService.otpCheck(email, otp);
  }

  @Patch('password')
  passwordRestore(@Body() { email, password }: any) {
    return this._restoreService.passwordRestore(email, password);
  }
}
