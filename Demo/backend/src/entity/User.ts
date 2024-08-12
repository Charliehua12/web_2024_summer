import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task';
import { List } from './List';
import { Comment } from './Comment.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => List, list => list.user)
  lists: List[];

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
