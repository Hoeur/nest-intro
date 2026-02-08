import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDtos {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  name: string;
  @ApiProperty({
    description: 'The slug of the tag',
    example: 'technology',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  slug: string;
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(256)
  description?: string;
  @ApiProperty({
    description: 'The schema of the tag',
    example: '{"@type": "Thing", "name": "Technology"}',
    required: false,
  })
  @IsString()
  schema?: string;
  @ApiPropertyOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
