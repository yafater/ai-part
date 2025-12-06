import { Module } from '@nestjs/common';
import { RuleRepository } from './rule.repository';
import { RuleController } from './rule.controller';
import { Rule, RuleSchema } from './rule.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rule.name, schema: RuleSchema }]),
  ],
  providers: [RuleRepository],
  exports: [RuleRepository],
  controllers: [RuleController],
})
export class RuleModule {}
