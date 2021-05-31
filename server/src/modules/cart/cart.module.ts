import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemRepository } from './repositories/cart.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([CartItemRepository])
  ],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
