import { UserEntity } from '../user/user.entity';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderService } from './service/order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    placeOrder(orderDto: OrderDto, user: UserEntity): unknown;
    updateOrder(orderDto: UpdateOrderDto, orderId: number): unknown;
    getUserPlaceOrder(user: UserEntity): unknown;
    getAllOrders(user: UserEntity): unknown;
    getOrderById(orderId: number): unknown;
}
