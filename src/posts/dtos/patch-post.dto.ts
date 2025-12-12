import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    required: true,
    description: 'ID of the post to be patched',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
