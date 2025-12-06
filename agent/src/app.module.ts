import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { validationSchema } from './config/validation';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './services/task.service';
import { GatewayService } from './services/gateway.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [TaskService, GatewayService],
})
export class AppModule {}
