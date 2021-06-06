import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { OrderDto, OrderItemDto, UpdateOrderDto } from '../dto/order.dto';
import { OrderEntity } from '../order.entity';
import { OrderRepository } from '../order.repository';
import { OrderItemEntity } from '../orderitem.entity';
import { OrderItemRepository } from '../orderitem.repository';

@Injectable()
export class OrderService {

    constructor(@InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository,
        @InjectRepository(OrderItemRepository) private readonly orderItemRepo: OrderItemRepository) {
    }

    async addOrders(orderDto: OrderDto, userId): Promise<any> {

        let { order_to_name, phone, paymentMethod, status, address, notes, prize, orderItems } = orderDto;
        if (!orderItems.length) {
            return new BadRequestException("Need Atleast one item to place order");
        }

        let order = new OrderEntity();

        order.order_to_name = order_to_name;
        order.phone = phone;
        order.paymentMethod = paymentMethod;
        order.userId = userId;
        order.status = status;
        order.address = address;
        order.notes = notes;
        order.prize = prize;
        let userOrder = await this.orderRepository.save(order);

        orderItems.forEach(async (item: OrderItemDto) => {
            let orderItem = new OrderItemEntity();
            orderItem.quantity = item.quantity
            orderItem.productId = item.product
            orderItem.orderId = userOrder.id;
            await this.orderItemRepo.save(orderItem)
        })

        return plainToClass(OrderDto, order);

    }

    async updateOrder(orderDto: UpdateOrderDto, id: number): Promise<any> {

        let { status } = orderDto;
        let order = await this.orderRepository.findOne({ where: { id } })
        if (!order) {
            return new NotFoundException("Order Does Not Exist");
        }

        order.status = status;
        let userOrder = await this.orderRepository.save(order);

        return plainToClass(OrderDto, userOrder);

    }

    async getUserPlaceOrder(userId: number) {
        let orders = await this.orderRepository.find({ where: { userId }, order: { updatedAt: 'DESC' }, select: ['id', 'order_to_name', 'prize', 'phone', 'paymentMethod', 'address', 'updatedAt', 'status'] });
        return orders;
    }

    async getAllOrders(userId: number) {
        let orders = await this.orderRepository.find({ order: { updatedAt: 'DESC' }, select: ['id', 'order_to_name', 'prize', 'phone', 'paymentMethod', 'address', 'updatedAt', 'status'] });
        return orders;
    }

    async getOrderById(id: number) {
        let order = await this.orderRepository.findOne({ where: { id }, relations: ['user'] });
        let orderItems = await this.orderItemRepo.find({where: {order: order}, relations: ['product']})
        return {...order, orderItems};
    }

}
