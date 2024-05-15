import { Module } from '@nestjs/common';
import { RmqModule } from '../providers/queue/rabbitmq/rmq.module';
import { TICKET_QUEUE, USER_QUEUE } from '../common/constants/services';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    RmqModule.register({ name: USER_QUEUE }),
    RmqModule.register({ name: TICKET_QUEUE }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
