import {
  Body,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as path from 'path';

import { IsAuthenticated } from '@shared/user';
import { UserEditDto } from '@shared/user/models';

import { UpdateController as Controller } from '../decorators';
import { UpdateService } from '../services';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class UpdateController {
  constructor(private readonly _updateService: UpdateService) {}

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() user: UserEditDto) {
    return this._updateService.updateUser(id, user);
  }

  @IsAuthenticated()
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '',
        filename: function (req: any, file: any, cb: any) {
          console.log('filename', file);
          // console.log(req);
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extention: string = path.parse(file.originalname).ext;

          cb(null, `public/images/users/${filename}${extention}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    // @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);

    return file.filename;
  }
}
