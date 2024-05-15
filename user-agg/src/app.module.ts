import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import Configs from 'src/common/configs/index';
import { RmqModule } from './providers/queue/rabbitmq/rmq.module';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DIR } from './common/constants/file';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
    UserModule,
    MulterModule.register({
      dest: FILE_UPLOAD_DIR,
      limits: { fieldSize: 1000 * 1000 * 2 },
    }),
  ],
})
export class AppModule {}
