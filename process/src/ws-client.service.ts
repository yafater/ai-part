import { Injectable, OnModuleInit } from '@nestjs/common';
import { io } from 'socket.io-client';
import { EventsService } from './event/event.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsClientService implements OnModuleInit {
  constructor(
    private readonly eventService: EventsService,
    private readonly configService: ConfigService,
  ) {}

  private socket;

  onModuleInit() {
    this.socket = io(this.configService.get<string>('agent.service')!, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to WS server!');
    });

    this.socket.on('sensor-event', (data) => {
      this.handleData(data);
    });
  }

  private async handleData(data: any) {
    try {
      await this.eventService.create(data);
    } catch (err) {
      console.error('Error saving event data:', err);
    }
  }
}
