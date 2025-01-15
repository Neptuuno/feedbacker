import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Feedback} from "../../feedbacks/entities/feedback.entity";
import {User} from "../../users/entities/user.entity";
import {Project} from "../../projects/entities/project.entity";
import {Link} from "../../links/entities/link.entity";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    color: string

    @OneToMany(() => Link, (link) => link.form)
    links: string[]

    @ManyToOne(() => User, (user) => user.forms)
    user: User

    @ManyToOne(() => Project, (project) => project.forms)
    project: Project

    @OneToMany(() => Feedback, (feedback) => feedback.form)
    feedbacks: Feedback[]
}
