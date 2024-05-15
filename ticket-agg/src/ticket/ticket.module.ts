import { Module } from '@nestjs/common';
import { RmqModule } from '../providers/queue/rabbitmq/rmq.module';
import { TICKET_QUEUE } from '../common/constants/services';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [RmqModule.register({ name: TICKET_QUEUE })],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
