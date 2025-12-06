import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Rule Engine')
    .setVersion('1.0')
    .addTag('rules')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: (
          configService.get<string>('kafka.brokers') || 'localhost:9092'
        ).split(','),
      },
      consumer: {
        groupId:
          configService.get<string>('kafka.consumerGroup') || 'default-group',
      },
    },
  });

  await app.startAllMicroservices();
  console.log('Kafka microservice started');

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
