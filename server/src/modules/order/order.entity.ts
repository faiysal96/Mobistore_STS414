import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './orderitem.entity';


@Entity({ name: 'order' })
export class OrderEntity extends AbstractEntity {

  @Column({ nullable: false })
  order_to_name: string;

  @Column({ nullable: false })
  phone: number;

  @Column({ nullable: false, default: 'CARD' })
  paymentMethod: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
  prize: number;

  @ManyToOne(() => UserEntity, user => user.orders, {
    onDelete: 'NO ACTION',
  })
  user: UserEntity;

  @JoinColumn()
  @OneToMany(() => OrderItemEntity, orderItem => orderItem.id, { cascade: true })
  orderItems: Array<OrderItemEntity>;

}



