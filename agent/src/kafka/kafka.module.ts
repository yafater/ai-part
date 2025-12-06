import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport, ClientOptions } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_PRODUCER',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientOptions => {
          const clientId =
            configService.get<string>('kafka.clientId') ?? 'default-client';
          const brokers = (
            configService.get<string>('kafka.brokers') || 'localhost:9092'
          ).split(',');
          const groupId =
            configService.get<string>('kafka.consumerGroup') ?? 'default-group';

          return {
            transport: Transport.KAFKA,
            options: {
              client: { clientId, brokers },
              consumer: { groupId },
            },
          };
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
