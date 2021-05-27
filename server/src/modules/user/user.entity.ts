import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.enum';
import { AbstractEntity } from '../../common/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { CartItemEntity } from '../cart/cart.entity';
import { OrderEntity } from '../order/order.entity';
// import { ProductEntity } from '../products/products.entity';


@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {

  @Index({ unique: true})
  @Column({ nullable: false })
  email: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({ nullable: false})
  password: string;
  
  @Column()
  salt: string;

  @Column({default: '', nullable: true})
  phone?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: string;

  @OneToMany(type => ProductEntity, product => product.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  products: ProductEntity[];
  
  @OneToMany(type => CartItemEntity, cart => cart.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  cartItems: CartItemEntity[];

  @OneToMany(type => OrderEntity, order => order.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  orders: OrderEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

}
