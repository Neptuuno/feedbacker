import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import {Form} from "../../forms/entities/form.entity";
import {Link} from "../../links/entities/link.entity";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text',{nullable: true})
  message: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @Column()
  platform: string;

  @Column()
  device: string;

  @Column()
  rating: number;

  @ManyToOne(() => Link, (link) => link.feedbacks)
  link: Link;

  @ManyToOne(() => Project, (project) => project.feedbacks)
  project: Project;

  @ManyToOne(() => Form, (form) => form.feedbacks)
  form: Form;
}
