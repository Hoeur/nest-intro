import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postEntity: Repository<Post>,
  ) {}

  public async findAll(limit: number, offset: number) {
    const posts = await this.postEntity.find({
      take: limit,
      skip: offset,
    });

    console.log(posts);
    return posts;
  }

  public findById(userId: number) {
    const user = this.usersService.findOneById(userId);
    return {
      userId: userId,
      user: user,
      title: 'First Post',
      content: 'This is the content of the first post.',
    };
  }

  public async create(body: CreatePostDto) {
    const post = await this.postEntity.find({
      where: { slug: body.slug },
    });

    if (post) {
      return 'Post already exists';
    }

    const newPost = this.postEntity.create(body);
    return this.postEntity.save(newPost);
  }

  public update(body: PatchPostDto) {
    return body;
  }
}
