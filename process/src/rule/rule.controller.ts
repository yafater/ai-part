import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRuleDto, RuleDto } from './rule.dto';
import { ApiResponsePaginated } from 'src/common/api-response-paginated.decorator';
import express from 'express';
import { RuleService } from './rule.service';

@Controller('rules')
@ApiTags('rules')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post()
  @ApiResponse({ status: 201, type: RuleDto })
  create(@Body() dto: CreateRuleDto) {
    return this.ruleService.createRule(dto);
  }

  @ApiResponsePaginated(RuleDto)
  @Get()
  async getRules(
    @Query() { page, limit, ...dto }: RuleDto,
    @Res() response: express.Response,
  ) {
    const [data, count] = await Promise.all([
      this.ruleService.findPaginated(page, limit, dto),
      this.ruleService.getCount(dto),
    ]);

    response.send({
      data,
      count,
      page,
      limit,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateRuleDto) {
    return this.ruleService.updateRule(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ruleService.deleteRule(id);
  }
}
