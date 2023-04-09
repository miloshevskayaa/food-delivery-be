import { Body, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';

import { ResetPasswordController as Controller } from '../decorators';
import { RestorePasswordDto } from '../dto';
import { RestorePasswordService } from '../services';

@Controller()
export class ResetPasswordController {
  constructor(private _restoreService: RestorePasswordService) {}

  @Get('check')
  sendMail(@Body() { email }: any) {
    console.log(email);

    return this._restoreService.sendMail(email);
  }

  @Get('otp')
  otpCheck(@Body() { email, otp }: RestorePasswordDto) {
    return this._restoreService.otpCheck(email, otp);
  }

  @Patch('password/:id')
  passwordRestore(@Param('id', ParseUUIDPipe) id: string, @Body() { password }: any) {
    return this._restoreService.passwordRestore(id, password);
  }
}
