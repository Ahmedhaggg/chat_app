import { GroupPrivacy } from "@common/enums/GroupPrivacy.enum";
import { GroupStatus } from "@common/enums/GroupStatus.enum";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupCategory } from "./groupCategory.entity";
import { User } from "@modules/user/entities/user.entity";

@Entity("groups")
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column("text")
    image: string

    @Column({
        default: new Date()
    })
    createdAt: Date

    @Column()
    code: string

    @Column({ type: "enum", enum: GroupPrivacy })
    privacy: GroupPrivacy

    @Column({ type: "enum", enum: GroupStatus })
    status: GroupStatus

    @ManyToOne(() => GroupCategory, category => category.groups)
    category: GroupCategory

    @ManyToOne(() => User, user => user.adminGroups)
    admin: User

    @ManyToMany(() => User)
    @JoinTable({ 
        name: "group_members",  
        joinColumn: { name: "groupId" }, // Specify the join column name
        inverseJoinColumn: { name: "memberId" }
    })
    members: User[]

}
