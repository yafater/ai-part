import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class GetRuleResultDto {
  @ApiProperty()
  @IsMongoId()
  ruleId: string;

  @ApiProperty({ example: '1404-09-01 12:20' })
  @IsString()
  fromDate: string;

  @ApiProperty({ example: '1404-09-30 14:20' })
  @IsString()
  toDate: string;
}

export class RuleResultEventDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ruleId: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  agentId: string;

  @ApiProperty()
  condition: string;

  @ApiProperty()
  matchedAt: string;
}
export class RuleResultDto {
  @ApiProperty()
  agentId: string;

  @ApiProperty({
    type: RuleResultEventDto,
    isArray: true,
  })
  events: RuleResultEventDto[];
}
