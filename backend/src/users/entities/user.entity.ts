import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, Unique} from "typeorm";
import {Project} from "../../projects/entities/project.entity";
import {IsEmail} from "class-validator";
import {Exclude} from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    @Exclude()
    password: string

    @Column({unique: true})
    @IsEmail()
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
