import { AbstractEntity } from '../../common/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
export declare class CartItemEntity extends AbstractEntity {
    quantity: number;
    user: UserEntity;
    productId: number;
    userId: number;
    product: ProductEntity;
}
