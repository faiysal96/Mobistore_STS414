import { Repository, EntityRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ConflictException, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { OrderItemEntity } from './orderitem.entity';

@EntityRepository(OrderItemEntity)
export class OrderItemRepository extends Repository<OrderItemEntity> {

    async createCartItem(){ };

}