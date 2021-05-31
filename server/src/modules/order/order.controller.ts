import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators';
import { UserEntity } from '../user/user.entity';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './service/order.service';

@Controller('api/order')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrderController {

    constructor(private orderService: OrderService) { }

    @Post('add')
    @ApiResponse({ status: 201, description: "Order Placed Successfully" })
    @UsePipes(ValidationPipe)
    async placeOrder(@Body() orderDto: OrderDto, @AuthUser() user: UserEntity) {
        return await this.orderService.addOrders(orderDto, user.id)
    }

    @Get('getUserOrders')
    @ApiResponse({ status: 200, description: "Order List" })
    async getUserPlaceOrder(@AuthUser() user: UserEntity) {
        return await this.orderService.getUserPlaceOrder(user.id)
    }
}
