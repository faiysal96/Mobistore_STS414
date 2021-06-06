import { UserEntity } from '../user/user.entity';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderService } from './service/order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    placeOrder(orderDto: OrderDto, user: UserEntity): Promise<any>;
    updateOrder(orderDto: UpdateOrderDto, orderId: number): Promise<any>;
    getUserPlaceOrder(user: UserEntity): Promise<import("./order.entity").OrderEntity[]>;
    getAllOrders(user: UserEntity): Promise<import("./order.entity").OrderEntity[]>;
    getOrderById(orderId: number): Promise<{
        orderItems: import("./orderitem.entity").OrderItemEntity[];
        order_to_name: string;
        phone: number;
        paymentMethod: string;
        status: string;
        address: string;
        notes: string;
        userId: number;
        prize: number;
        user: UserEntity;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
