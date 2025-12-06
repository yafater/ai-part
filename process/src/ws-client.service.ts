import { Injectable, OnModuleInit } from '@nestjs/common';
import { io } from 'socket.io-client';
import { EventRepository } from './event/event.repository';
import { ConfigService } from '@nestjs/config';
import { RuleResultService } from './rule-result/rule-result.service';
import { RuleService } from './rule/rule.service';
import { EventTypes } from './event/event.types';

@Injectable()
export class WsClientService implements OnModuleInit {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly configService: ConfigService,
    private readonly ruleService: RuleService,
    private readonly ruleResultService: RuleResultService,
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
      const event = await this.eventRepository.create(data);
      const rules = await this.ruleService.findByEventType(
        event.name as EventTypes,
      );
      await this.ruleResultService.matchEventWithRules(event, rules);
    } catch (err) {
      console.error('Error saving event data:', err);
    }
  }
}
