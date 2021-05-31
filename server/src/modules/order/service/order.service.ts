import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { OrderDto, OrderItemDto } from '../dto/order.dto';
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

    async getUserPlaceOrder(userId: number) {
        let orders = await this.orderRepository.find({ where: { userId }, order: { updatedAt: 'DESC' }, select: ['id', 'order_to_name', 'prize', 'phone', 'paymentMethod', 'address', 'updatedAt', 'status'] });
        return orders;
    }

}
