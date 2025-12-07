import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.entity';
import { CreateEventDto } from './create-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventDocument> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<EventDocument[]> {
    return this.eventModel.find().exec();
  }
}
