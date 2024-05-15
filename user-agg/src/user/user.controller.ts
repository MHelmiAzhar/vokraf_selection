import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Payload } from '@nestjs/microservices';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { FILE_UPLOAD_DIR } from '../common/constants/file';
import { fileNameEditor } from '../util/fileNameEditor';
import { imageFileFilter } from '../util/fileFilter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,

        destination: FILE_UPLOAD_DIR,
      }),
      limits: { fileSize: 1000 * 1000 * 2 },
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, file);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }
  @Get('summary/task/:id')
  summaryTask(@Param('id') user_id: string) {
    return this.userService.getSummary(user_id);
  }
  @Get('biweekly/perfomance/:id')
  getBiWeeklyPerformance(@Param('id') user_id: string) {
    return this.userService.getBiWeeklyPerformance(user_id);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,

        destination: FILE_UPLOAD_DIR,
      }),
      limits: { fileSize: 1000 * 1000 * 2 },
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @Param('id') userId: string,
    @Payload() updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    return this.userService.update(userId, updateUserDto, file);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
