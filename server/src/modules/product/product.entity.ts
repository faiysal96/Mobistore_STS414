import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne, JoinTable } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { CartItemEntity } from '../cart/cart.entity';
import { OrderItemEntity } from '../order/orderitem.entity';
import { UserEntity } from '../user/user.entity';
import { ProductImageEntity } from './productimage.entity';


@Entity({ name: 'product' })
export class ProductEntity extends AbstractEntity {

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
  prize: number;

  @ManyToOne(() => UserEntity, user => user.products)
  user: UserEntity;

  @OneToMany(() => ProductImageEntity, productImage => productImage.product, { cascade: true })
  @JoinColumn()
  images: Array<ProductImageEntity>;

  @OneToMany(() => ProductImageEntity, productImage => productImage.product, { cascade: true })
  @JoinColumn()
  orderItems: Array<OrderItemEntity>;

  @OneToMany(() => CartItemEntity, cartItem => cartItem.product, { cascade: true })
  @JoinColumn()
  cartItems: Array<ProductImageEntity>;

}



