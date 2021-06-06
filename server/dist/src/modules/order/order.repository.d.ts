import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
export declare class OrderRepository extends Repository<OrderEntity> {
    createCartItem(): void;
}
