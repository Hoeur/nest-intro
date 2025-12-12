import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    required: true,
    description: 'Title of the post',
    minLength: 3,
    maxLength: 96,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  title: string;

  @ApiProperty({
    required: false,
    description: 'Content of the post (optional)',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(255)
  content?: string;

  @ApiProperty({
    required: true,
    description: 'Type of the post',
    enum: postType,
    example: postType.POST,
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    required: true,
    description: 'Slug for the post',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    example: 'my-first-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.',
  })
  slug: string;

  @ApiProperty({
    required: true,
    description: 'Status of the post',
    enum: postStatus,
    example: postStatus.DRAFT,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @IsISO8601()
  @IsOptional()
  publicOn: Date;

  @ApiProperty({
    required: false,
    description: 'Tags associated with the post',
    type: [String],
    minLength: 3,
    example: ['nestjs', 'programming', 'tutorial'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiProperty({
    required: false,
    description: 'Feature image URL for the post',
    example: 'https://example.com/images/feature-image.jpg',
  })
  @IsOptional()
  @IsUrl()
  featureImageUrl?: string;

  @ApiProperty({
    required: false,
    description: 'Meta options for the post',
    type: [CreatePostMetaOptionsDto],
    example: [
      {
        key: 'meta_description',
        value: 'This is a sample meta description for the post.',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
