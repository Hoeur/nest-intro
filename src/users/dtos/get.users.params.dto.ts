import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamsDto {
  @ApiPropertyOptional({ description: 'The ID of the user', example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
