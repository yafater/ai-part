import { Injectable, OnModuleInit } from '@nestjs/common';
import { io } from 'socket.io-client';
import { EventRepository } from './event/event.repository';
import { ConfigService } from '@nestjs/config';
import { RuleRepository } from './rule/rule.repository';
import { RuleResultService } from './rule-result/rule-result.service';

@Injectable()
export class WsClientService implements OnModuleInit {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly configService: ConfigService,
    private readonly ruleRepository: RuleRepository,
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
      const rules = await this.ruleRepository.findAll();
      await this.ruleResultService.matchEventWithRules(event, rules);
    } catch (err) {
      console.error('Error saving event data:', err);
    }
  }
}
