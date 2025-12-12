import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { GetPostsParamsDto } from './dtos/get-posts.params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  public getPosts(
    @Param() getPostParamDto: GetPostsParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    return this.postsService.findAll(limit, offset);
  }

  @Get('/:userId')
  public getPost(@Param('userId') userId: number) {
    return this.postsService.findById(userId);
  }

  @ApiOperation({
    summary: 'Create a new post',
    description: 'Creates a new post with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postsService.create(createPostDto);
    } catch (e: any) {
      return 'something went wrong: ' + e.message;
    }
  }

  @ApiOperation({
    summary: 'Patch a post',
    description: 'Patch a post with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully patch.',
  })
  @Patch('/:id')
  public updatePost(@Body() updatePostDto: PatchPostDto) {
    return this.postsService.update(updatePostDto);
  }
}
