import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { postType } from './enums/postType.enum';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  @Column({
    type: 'integer',
    primary: true,
    generated: true,
  })
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  title: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  content: string;
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  status: string;
  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 256,
  })
  slug: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;
  @Column({
    type: 'json',
    nullable: true,
  })
  tags?: string[];
  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl?: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metaOptions?: CreatePostMetaOptionsDto[];
}
