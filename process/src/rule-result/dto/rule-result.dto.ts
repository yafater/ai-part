import { ApiProperty } from '@nestjs/swagger';

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
