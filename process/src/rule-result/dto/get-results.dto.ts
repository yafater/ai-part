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
