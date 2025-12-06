import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { baseToJson } from 'src/common/base-to-json';

export type RuleDocument = HydratedDocument<Rule>;

@Schema({ timestamps: true, toJSON: baseToJson })
export class Rule {
  @Prop()
  name: string;

  @Prop()
  field: string;

  @Prop()
  operation: string;

  @Prop()
  value: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
RuleSchema.virtual('id').get(function () {
  return this._id.toString();
});
