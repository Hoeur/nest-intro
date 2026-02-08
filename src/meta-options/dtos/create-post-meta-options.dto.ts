import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsString()
  @IsJSON()
  mataValue: string;
}
