import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './orderitem.entity';
export declare class OrderEntity extends AbstractEntity {
    order_to_name: string;
    phone: number;
    paymentMethod: string;
    status: string;
    address: string;
    notes: string;
    userId: number;
    prize: number;
    user: UserEntity;
    orderItems: Array<OrderItemEntity>;
}
