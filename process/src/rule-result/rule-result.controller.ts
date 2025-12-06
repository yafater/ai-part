import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetRuleResultDto } from './get-results.dto';
import { RuleResultService } from './rule-result.service';

@ApiTags('rule-results')
@Controller('rule-results')
export class RuleResultController {
  constructor(private ruleResultService: RuleResultService) {}

  @Post()
  async getRuleResults(@Body() dto: GetRuleResultDto) {
    return this.ruleResultService.getRuleResultsByDate({
      from: dto.fromDate,
      to: dto.toDate,
      ruleId: dto.ruleId,
    });
  }

  @Get('rule/:ruleId/agents')
  async getAgentsForRule(@Param('ruleId') ruleId: string) {
    return this.ruleResultService.getRuleAgents(ruleId);
  }
}
