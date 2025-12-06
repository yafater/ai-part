import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GatewayService } from './gateway.service';

@Injectable()
export class TaskService {
  constructor(private readonly gatewayService: GatewayService) {}
  @Cron('*/5 * * * * *')
  handleEvents() {
    this.gatewayService.sendEvent();
  }
}
