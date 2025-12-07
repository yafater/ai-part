import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { baseToJson } from '../common/helpers/base-to-json';

export type EventDocument = HydratedDocument<Event>;
@Schema({
  timestamps: true,
  toJSON: baseToJson,
})
export class Event {
  @Prop()
  name: string;

  @Prop()
  value: number;

  @Prop()
  agentId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('id').get(function () {
  return this._id.toString();
});
