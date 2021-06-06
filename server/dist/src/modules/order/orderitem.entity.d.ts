import { AbstractEntity } from '../../common/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';
export declare class OrderItemEntity extends AbstractEntity {
    quantity: number;
    productId: number;
    orderId: number;
    order: OrderEntity;
    product: ProductEntity;
}
