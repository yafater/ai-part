import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRuleResultDto, RuleResultDto } from './get-results.dto';
import { RuleResultService } from './rule-result.service';

@ApiTags('rule-results')
@Controller('rule-results')
export class RuleResultController {
  constructor(private ruleResultService: RuleResultService) {}

  @Post()
  @ApiResponse({ status: 201, type: RuleResultDto })
  async getRuleResults(@Body() dto: GetRuleResultDto) {
    return this.ruleResultService.getRuleResultsByDate({
      from: dto.fromDate,
      to: dto.toDate,
      ruleId: dto.ruleId,
    });
  }

  @Get('rule/:ruleId/agents')
  @ApiResponse({ status: 201, type: RuleResultDto })
  async getAgentsForRule(@Param('ruleId') ruleId: string) {
    return this.ruleResultService.getRuleAgents(ruleId);
  }
}
