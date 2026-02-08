import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 256,
  })
  slug: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 256,
  })
  description?: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 256,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1024,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deletedDate?: Date;
}
