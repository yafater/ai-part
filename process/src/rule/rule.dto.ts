import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { RuleOperation } from './rule-operation.enum';
import { EventTypes } from 'src/event/event.types';
import { Type } from 'class-transformer';
import { ToBoolean } from 'src/common/to-boolean.decorator';

export class CreateRuleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: EventTypes })
  @IsEnum(EventTypes)
  @IsNotEmpty()
  field: EventTypes;

  @ApiProperty({ enum: RuleOperation })
  @IsEnum(RuleOperation)
  @IsNotEmpty()
  operation: RuleOperation;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

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
