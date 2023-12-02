import { Group } from "@modules/groups/entities/group.entity";
import { User } from "@modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("GroupInvitations")
export class GroupInvitation {
    
    @PrimaryGeneratedColumn()
    id:  number

    @Column({ default: new Date() })
    createdAt: Date

    @ManyToOne(() => User)
    receiver: User

    @ManyToOne(() => User)
    sender: User

    @ManyToOne(() => Group)
    group: Group
}