import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { baseToJson } from 'src/common/base-to-json';

export type RuleResultDocument = HydratedDocument<RuleResult>;

@Schema({
  timestamps: true,
  toJSON: baseToJson,
  collection: 'rule-results',
})
export class RuleResult {
  @Prop({ type: Types.ObjectId, ref: 'Rule', required: true })
  ruleId: string;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: string;

  @Prop()
  agentId: string;

  @Prop()
  condition: string;

  @Prop({ default: Date.now })
  matchedAt: Date;
}

export const RuleResultSchema = SchemaFactory.createForClass(RuleResult);
RuleResultSchema.virtual('id').get(function () {
  return this._id.toString();
});

RuleResultSchema.index({ ruleId: 1, matchedAt: 1 });
RuleResultSchema.index({ agentId: 1 });
RuleResultSchema.index({ matchedAt: 1 });
