import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Feedback } from "../../feedbacks/entities/feedback.entity";
import {Form} from "../../forms/entities/form.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  description: string

  @Column({ nullable: true })
  imagePath: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @OneToMany(() => Form, (form) => form.project)
  forms: Form[];
}
