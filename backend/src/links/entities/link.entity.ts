import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Form} from "../../forms/entities/form.entity";

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    isActive: boolean

    @ManyToOne(() => Form, (form) => form.links)
    form: Form
}
