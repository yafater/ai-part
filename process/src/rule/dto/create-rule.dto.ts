import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { RuleOperation } from '../../common/enum/rule-operation.enum';
import { EventTypes } from 'src/common/enum/event.types.enum';

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
