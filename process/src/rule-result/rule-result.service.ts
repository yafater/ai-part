import { BadRequestException, Injectable } from '@nestjs/common';
import { RuleResult } from './rule-result.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RuleDocument } from 'src/rule/rule.schema';
import { EventDocument } from 'src/event/event.schema';
import { GetTimeDiffInMinutes, PersianToDate } from 'src/common/date';

@Injectable()
export class RuleResultService {
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

  private checkDate(fromDate: Date, toDate: Date) {
    const diff = GetTimeDiffInMinutes(fromDate.getTime(), toDate.getTime());

    if (diff > 24 * 60) {
      throw new BadRequestException('date range should be 1 day at most');
    }
  }

  async getRuleResultsByDate({
    from,
    to,
    ruleId,
  }: {
    from: string;
    to: string;
    ruleId: string;
  }) {
    const fromDate = PersianToDate(from);
    const toDate = PersianToDate(to);

    this.checkDate(fromDate, toDate);

    const result = await this.ruleResultModel.aggregate([
      {
        $match: {
          ruleId: new Types.ObjectId(ruleId),
          matchedAt: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: '$agentId',
          events: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          agentId: '$_id',
          count: 1,
          events: 1,
        },
      },
    ]);
    return result;
  }

  async getRuleAgents(ruleId: string) {
    const result = await this.ruleResultModel.aggregate([
      {
        $match: { ruleId: new Types.ObjectId(ruleId) },
      },
      { $sort: { matchedAt: 1 } },
      { $group: { _id: '$agentId', events: { $push: '$$ROOT' } } },
      {
        $project: {
          _id: 0,
          agentId: '$_id',
          count: 1,
          events: 1,
        },
      },
    ]);
    return result;
  }
}
