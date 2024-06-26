import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './providers/queue/rabbbitmq/rmq.service';
import { RmqOptions } from '@nestjs/microservices';
import { TICKET_QUEUE } from './common/constants/service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const mongoUri: string = configService.get<string>('database.host');
  const dbName: string = configService.get<string>('database.name');
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(TICKET_QUEUE, true),
  );

  await app.startAllMicroservices();

  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`DATABASE\t: ${mongoUri}/${dbName}`);
}
bootstrap();
