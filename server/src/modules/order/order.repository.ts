import { Repository, EntityRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ConflictException, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { OrderEntity } from './order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {

    createCartItem() {
    }
}