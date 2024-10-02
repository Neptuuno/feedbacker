import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  identification: string;

  @Column('text')
  comment: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @Column()
  platform: string;

  @ManyToOne(() => Project, (project) => project.feedbacks)
  project: Project;
}
