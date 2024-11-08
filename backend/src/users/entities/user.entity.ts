import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, Unique} from "typeorm";
import {Project} from "../../projects/entities/project.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({unique: true})
    email: string

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]

    @BeforeInsert()
    setUsername() {
        if (!this.username) {
            this.username = this.email;
        }
    }
}
