import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';


@Entity({ name: 'order_item' })
export class OrderItemEntity extends AbstractEntity {

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  orderId: number;

  @ManyToOne(() => OrderEntity, order => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, product => product.orderItems, { onDelete: 'NO ACTION', })
  product: ProductEntity;

}



