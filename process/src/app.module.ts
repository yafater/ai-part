import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { validationSchema } from './config/validation';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { WsClientService } from './ws-client.service';
import { RuleModule } from './rule/rule.module';
import { RuleResultModule } from './rule-result/rule-result.module';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),

    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.uri'),
      }),
      inject: [ConfigService],
    }),

    EventModule,
    RuleModule,
    RuleResultModule,
    RedisModule,
  ],
  controllers: [],
  providers: [WsClientService],
})
export class AppModule {}
