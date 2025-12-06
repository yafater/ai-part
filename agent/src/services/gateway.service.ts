import { faker } from '@faker-js/faker';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

interface EventDataDto {
  name: string;
  value: number;
  agentId: string;
}
@Injectable()
export class GatewayService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('sensor-event');
    await this.kafkaClient.connect();
  }

  sendEvent() {
    const event = this.generateRandomSenorData();
    this.kafkaClient.emit('sensor-event', { event });
  }

  private generateRandomSenorData(): EventDataDto {
    const events = {
      temperature: () =>
        faker.number.float({
          min: -10,
          max: 60,
          fractionDigits: 1,
        }),
      pressure: () =>
        faker.number.float({
          min: 900,
          max: 1100,
          fractionDigits: 1,
        }),
      noise: () => faker.number.float({ min: 20, max: 120, fractionDigits: 1 }),
      voltage: () =>
        faker.number.float({
          min: 3.0,
          max: 12.5,
          fractionDigits: 2,
        }),
      speed: () => faker.number.float({ min: 0, max: 120, fractionDigits: 2 }),
    };

    const keys = Object.keys(events);
    const randomKey = faker.helpers.arrayElement(keys) as keyof typeof events;

    return {
      name: randomKey.toUpperCase(),
      value: events[randomKey](),
      agentId: this.configService.get<string>('agent.id')!,
    };
  }
}
