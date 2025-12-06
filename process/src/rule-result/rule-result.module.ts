import { Module } from '@nestjs/common';
import { RuleResultService } from './rule-result.service';
import { RuleResult, RuleResultSchema } from './rule-result.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleResultController } from './rule-result.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RuleResult.name, schema: RuleResultSchema },
    ]),
  ],
  providers: [RuleResultService],
  exports: [RuleResultService],
  controllers: [RuleResultController],
})
export class RuleResultModule {}
