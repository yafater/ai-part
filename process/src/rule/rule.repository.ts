import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rule, RuleDocument } from './rule.schema';
import { Model } from 'mongoose';
import { CreateRuleDto, RuleDto } from './rule.dto';

@Injectable()
export class RuleRepository {
  constructor(
    @InjectModel(Rule.name)
    private ruleModel: Model<Rule>,
  ) {}

  async create(createEventDto: CreateRuleDto): Promise<RuleDocument> {
    const createdEvent = new this.ruleModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<RuleDocument[]> {
    return this.ruleModel.find().exec();
  }

  async findPaginated(
    page: number,
    limit: number,
    dto: Partial<RuleDto>,
  ): Promise<RuleDocument[]> {
    return this.ruleModel
      .find(dto)
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async getCount(dto: Partial<RuleDto>) {
    return this.ruleModel.countDocuments(dto);
  }

  async update(id: string, dto: Partial<CreateRuleDto>) {
    return this.ruleModel.findByIdAndUpdate(id, dto);
  }

  async delete(id: string) {
    return this.ruleModel.findByIdAndDelete(id);
  }
}
