import { Module } from '@nestjs/common';
import { RuleMatchingService } from './rule-matching.service';
import { RuleResult, RuleResultSchema } from './rule-result.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RuleResult.name, schema: RuleResultSchema },
    ]),
  ],
  providers: [RuleMatchingService],
  exports: [RuleMatchingService],
  controllers: [],
})
export class RuleResultModule {}
