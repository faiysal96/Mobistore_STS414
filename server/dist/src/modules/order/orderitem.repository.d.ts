import { Repository } from 'typeorm';
import { OrderItemEntity } from './orderitem.entity';
export declare class OrderItemRepository extends Repository<OrderItemEntity> {
    createCartItem(): Promise<void>;
}
