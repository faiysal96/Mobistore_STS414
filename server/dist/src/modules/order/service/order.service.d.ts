import { OrderDto, UpdateOrderDto } from '../dto/order.dto';
import { OrderEntity } from '../order.entity';
import { OrderRepository } from '../order.repository';
import { OrderItemEntity } from '../orderitem.entity';
import { OrderItemRepository } from '../orderitem.repository';
export declare class OrderService {
    private readonly orderRepository;
    private readonly orderItemRepo;
    constructor(orderRepository: OrderRepository, orderItemRepo: OrderItemRepository);
    addOrders(orderDto: OrderDto, userId: any): Promise<any>;
    updateOrder(orderDto: UpdateOrderDto, id: number): Promise<any>;
    getUserPlaceOrder(userId: number): Promise<OrderEntity[]>;
    getAllOrders(userId: number): Promise<OrderEntity[]>;
    getOrderById(id: number): Promise<{
        orderItems: OrderItemEntity[];
        order_to_name: string;
        phone: number;
        paymentMethod: string;
        status: string;
        address: string;
        notes: string;
        userId: number;
        prize: number;
        user: import("../../user/user.entity").UserEntity;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
