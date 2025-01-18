import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import {Form} from "../../forms/entities/form.entity";
import {Link} from "../../links/entities/link.entity";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  identification: string;

  @Column('text')
  message: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @Column({nullable: true})
  platform: string;

  @Column()
  rating: number;

  @ManyToOne(() => Link, (link) => link.feedbacks)
  link: Link;

  @ManyToOne(() => Project, (project) => project.feedbacks)
  project: Project;

  @ManyToOne(() => Form, (form) => form.feedbacks)
  form: Form;
}
