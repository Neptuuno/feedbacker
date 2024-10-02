import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Feedback } from "../../feedbacks/entities/feedback.entity";

export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  description: string

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @OneToMany(() => Feedback, (feedback) => feedback.project)
  feedbacks: Feedback[];
}
