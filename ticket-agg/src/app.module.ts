import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configs from './common/configs';
import { RmqModule } from './providers/queue/rabbitmq/rmq.module';
import { TicketModule } from './ticket/ticket.module';

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
    TicketModule,
  ],
})
export class AppModule {}
