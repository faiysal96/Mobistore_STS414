import { AbstractEntity } from '../../common/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { CartItemEntity } from '../cart/cart.entity';
import { OrderEntity } from '../order/order.entity';
import { SupportEntity } from '../support/support.entity';
export declare class UserEntity extends AbstractEntity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    salt: string;
    phone?: string;
    role: string;
    products: ProductEntity[];
    cartItems: CartItemEntity[];
    orders: OrderEntity[];
    issues: SupportEntity[];
    validatePassword(password: string): Promise<boolean>;
}
