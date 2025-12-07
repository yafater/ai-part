import { Injectable, NotFoundException } from '@nestjs/common';
import { RuleRepository } from './rule.repository';
import { RedisService } from '../redis/redis.service';
import { RuleDocument } from './rule.entity';
import { RuleDto } from './dto/rule.dto';
import { EventTypes } from 'src/common/enum/event.types.enum';
import { CreateRuleDto } from './dto/create-rule.dto';

@Injectable()
export class RuleService {
  constructor(
    private readonly ruleRepository: RuleRepository,
    private readonly redisService: RedisService,
  ) {}

  private getCacheListKey(eventType: EventTypes) {
    return `rules:list:${eventType}`;
  }

  async createRule(dto: CreateRuleDto): Promise<RuleDocument> {
    const rule = await this.ruleRepository.create(dto);
    await this.redisService.del(this.getCacheListKey(dto.field));
    return rule;
  }

  async findByEventType(eventType: EventTypes): Promise<RuleDocument[]> {
    const cacheKey = this.getCacheListKey(eventType);
    const cached = await this.redisService.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const rules = await this.ruleRepository.findByEventType(eventType);
    await this.redisService.set(cacheKey, rules, 600);
    return rules;
  }

  async findPaginated(
    page: number,
    limit: number,
    dto: Partial<RuleDto>,
  ): Promise<RuleDocument[]> {
    return this.ruleRepository.findPaginated(page, limit, dto);
  }

  async updateRule(id: string, dto: Partial<CreateRuleDto>) {
    const rule = await this.ruleRepository.findOneById(id);
    if (!rule) throw new NotFoundException('Rule not found');
    await this.ruleRepository.update(id, dto);

    await this.redisService.del(this.getCacheListKey(rule.field as EventTypes));
  }

  async deleteRule(id: string) {
    const rule = await this.ruleRepository.findOneById(id);
    if (!rule) throw new NotFoundException('Rule not found');
    await this.ruleRepository.delete(id);

    await this.redisService.del(this.getCacheListKey(rule.field as EventTypes));
  }

  async getCount(dto: Partial<RuleDto>): Promise<number> {
    return this.ruleRepository.getCount(dto);
  }
}
