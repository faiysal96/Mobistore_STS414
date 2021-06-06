import { AbstractEntity } from '../../common/abstract.entity';
import { OrderItemEntity } from '../order/orderitem.entity';
import { UserEntity } from '../user/user.entity';
import { ProductImageEntity } from './productimage.entity';
export declare class ProductEntity extends AbstractEntity {
    stock: number;
    name: string;
    description: string;
    prize: number;
    user: UserEntity;
    images: Array<ProductImageEntity>;
    orderItems: Array<OrderItemEntity>;
    cartItems: Array<ProductImageEntity>;
}
