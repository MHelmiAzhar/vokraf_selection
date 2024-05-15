import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schema/ticket.schema';
import { USER_QUEUE } from '../common/constants/service';
import { RmqModule } from '../providers/queue/rabbbitmq/rmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
    RmqModule.register({ name: USER_QUEUE }),
  ],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
