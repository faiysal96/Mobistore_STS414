import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderItemRepository } from './orderitem.repository';
import { OrderService } from './service/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderItemRepository]),
  ],
  providers:[OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
