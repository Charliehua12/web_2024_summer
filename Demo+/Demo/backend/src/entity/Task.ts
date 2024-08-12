import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { List } from './List';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => List, list => list.tasks)
  list: List;

  @ManyToOne(() => User, user => user.tasks)
  user: User;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];
}
