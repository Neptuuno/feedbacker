import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Form} from "../../forms/entities/form.entity";
import {Feedback} from "../../feedbacks/entities/feedback.entity";
@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    slug: string

    @Column()
    isActive: boolean

    @ManyToOne(() => Form, (form) => form.links)
    form: Form

    @OneToMany(() => Feedback, (feedback) => feedback.link)
    feedbacks: Feedback[];
}
