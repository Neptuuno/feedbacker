import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, Unique} from "typeorm";
import {Project} from "../../projects/entities/project.entity";
import {IsEmail} from "class-validator";
import {Exclude} from "class-transformer";
import {Form} from "../../forms/entities/form.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true, nullable: true})
    chat_app_user_id: number

    @Column()
    @Exclude()
    password: string

    @Column({unique: true})
    @IsEmail()
    email: string

    @Column({ nullable: true, unique: true })
    googleId: string;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[]

    @OneToMany(() => Form, (form) => form.user)
    forms: Form[]

    @BeforeInsert()
    setUsername() {
        if (!this.username) {
            this.username = this.email;
        }
    }
}
