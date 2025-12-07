import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { RuleOperation } from '../../common/enum/rule-operation.enum';
import { EventTypes } from 'src/common/enum/event.types.enum';
import { Type } from 'class-transformer';
import { ToBoolean } from 'src/common/decorators/to-boolean.decorator';

export class RuleDto {
  @ApiProperty({ required: false, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit: number = 10;

  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional({ enum: EventTypes })
  field?: EventTypes;

  @ApiPropertyOptional({ enum: RuleOperation })
  operation?: RuleOperation;

  @ApiProperty()
  @IsBoolean()
  @ToBoolean()
  isActive: boolean;
}
