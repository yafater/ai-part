import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rule, RuleDocument } from './rule.schema';
import { Model } from 'mongoose';
import { CreateRuleDto, RuleDto } from './rule.dto';
import { EventTypes } from 'src/event/event.types';

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
    return this.ruleModel.find({ deleted: false }).exec();
  }

  findByEventType(eventType: EventTypes): Promise<RuleDocument[]> {
    return this.ruleModel.find({ deleted: false, field: eventType }).exec();
  }

  async findOneById(id: string) {
    return this.ruleModel.findById(id);
  }

  async findPaginated(
    page: number,
    limit: number,
    dto: Partial<RuleDto>,
  ): Promise<RuleDocument[]> {
    return this.ruleModel
      .find({ deleted: false, ...dto })
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
    return this.ruleModel.findByIdAndUpdate(
      id,
      {
        deleted: true,
        deletedAt: new Date(),
      },
      { new: true },
    );
  }
}
