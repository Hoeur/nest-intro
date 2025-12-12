import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
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
  firstName: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 96,
  })
  lastName: string;
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;
}
