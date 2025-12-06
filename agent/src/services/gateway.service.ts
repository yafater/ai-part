import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';

interface EventDataDto {
  name: string;
  value: number;
  agent: string;
}
@WebSocketGateway()
export class GatewayService {
  constructor(private configService: ConfigService) {}

  @WebSocketServer()
  server: Server;

  sendEvent() {
    this.server.emit('sensor-event', this.generateRandomSenorData());
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
      agent: this.configService.get<string>('agent.service')!,
    };
  }
}
