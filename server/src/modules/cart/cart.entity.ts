
import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'cart' })
export class CartItemEntity extends AbstractEntity {

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => UserEntity, user => user.cartItems, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({nullable: true})
  productId: number

  @Column({nullable: true})
  userId: number

  @ManyToOne(() => ProductEntity, product => product.cartItems, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

}



