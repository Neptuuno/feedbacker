import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Feedback} from "../../feedbacks/entities/feedback.entity";
import {User} from "../../users/entities/user.entity";

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

    @ManyToOne(() => User, (user) => user.forms)
    user: User

    @OneToMany(() => Feedback, (feedback) => feedback.form)
    feedbacks: Feedback[]
}
