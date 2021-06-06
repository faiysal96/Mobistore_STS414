import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne, JoinTable } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'support' })
export class SupportEntity extends AbstractEntity {

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: true, length: 2200, default: '[]' })
    conversation: string;

    @Column({ nullable: false, enum: ['RESOLVED', 'PENDING'], default: 'PENDING'})
    status: string;


    @Column({ nullable: false })
    userId: number;

    @ManyToOne(() => UserEntity, user => user.issues)
    @JoinColumn()
    user: UserEntity;
}



