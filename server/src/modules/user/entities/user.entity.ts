import { Group } from '@modules/groups/entities/group.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  photo: string;

  @Column({ unique: true, nullable: false, select: false })
  email: string;
 
  @Column({default: 0, type: "smallint" })
  groupsNumber: number

  @OneToMany(() => Group, group => group.admin, { lazy: true })
  adminGroups: Promise<Group[]>

  @ManyToMany(() => Group, group => group.members)
  groups: Group[]
}

