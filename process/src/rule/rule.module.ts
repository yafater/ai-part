import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { Rule, RuleSchema } from './rule.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
  ],
  providers: [RuleService],
  exports: [RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
