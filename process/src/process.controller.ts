import { Controller } from '@nestjs/common';
import { EventRepository } from './event/event.repository';
import { ConfigService } from '@nestjs/config';
import { RuleResultService } from './rule-result/rule-result.service';
import { RuleService } from './rule/rule.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventTypes } from './common/enum/event.types.enum';
export class EventDto {
  name: EventTypes;
  value: number;
  agentId: string;
}

@Controller()
export class ProcessController {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly configService: ConfigService,
    private readonly ruleService: RuleService,
    private readonly ruleResultService: RuleResultService,
  ) {}

  @EventPattern('sensor-event')
  async handleData(@Payload() data: { event: EventDto }) {
    try {
      const event = await this.eventRepository.create(data.event);
      const rules = await this.ruleService.findByEventType(data.event.name);
      await this.ruleResultService.matchEventWithRules(event, rules);
    } catch (err) {
      console.error('Error saving event data:', err);
    }
  }
}
