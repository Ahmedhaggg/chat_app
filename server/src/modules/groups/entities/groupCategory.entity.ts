import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Group } from "./group.entity";
import { group } from "console";

@Entity("group_Categories")
export class GroupCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Group, (group) => group.category)
    groups: Group[]    
}