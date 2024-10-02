import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Project } from "../../projects/entities/project.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[]

}
