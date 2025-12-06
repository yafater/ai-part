import { Injectable } from '@nestjs/common';
import { RuleResult } from './rule-result.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RuleDocument } from 'src/rule/rule.schema';
import { EventDocument } from 'src/event/event.schema';

@Injectable()
export class RuleMatchingService {
  constructor(
    @InjectModel(RuleResult.name)
    private ruleResultModel: Model<RuleResult>,
  ) {}

  async matchEventWithRules(event: EventDocument, rules: RuleDocument[]) {
    const matches: RuleResult[] = [];

    rules.forEach((rule) => {
      const value = event.value;
      let isMatch = false;

      switch (rule.operation) {
        case '>':
          isMatch = value > rule.value;
          break;
        case '<':
          isMatch = value < rule.value;
          break;
        case '=':
          isMatch = value === rule.value;
          break;
      }

      if (isMatch) {
        matches.push(
          new this.ruleResultModel({
            ruleId: new Types.ObjectId(rule.id),
            eventId: new Types.ObjectId(event.id),
            agentId: event.agentId,
            condition: `${event.name}${rule.operation}${rule.value}`,
          }),
        );
      }
    });

    if (matches.length) {
      await this.ruleResultModel.insertMany(matches);
    }
  }
}
