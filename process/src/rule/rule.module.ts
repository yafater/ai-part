import { Module } from '@nestjs/common';
import { RuleRepository } from './rule.repository';
import { RuleController } from './rule.controller';
import { Rule, RuleSchema } from './rule.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleService } from './rule.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
  ],
  providers: [RuleRepository, RuleService],
  exports: [RuleRepository, RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
