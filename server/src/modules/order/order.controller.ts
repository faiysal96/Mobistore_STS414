import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards';
import { UserEntity } from '../user/user.entity';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
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

    @Put('update/:id')
    @ApiResponse({ status: 201, description: "Order updated Successfully" })
    @UsePipes(ValidationPipe)
    async updateOrder(@Body() orderDto: UpdateOrderDto, @Param('id', ParseIntPipe) orderId: number) {
        return await this.orderService.updateOrder(orderDto, orderId)
    }

    @Get('getUserOrders')
    @ApiResponse({ status: 200, description: "Order List" })
    async getUserPlaceOrder(@AuthUser() user: UserEntity) {
        return await this.orderService.getUserPlaceOrder(user.id)
    }

    @Get('getAllOrders')
    @UseGuards(new RoleGuard('ADMIN'))
    @ApiResponse({ status: 200, description: "Order List" })
    async getAllOrders(@AuthUser() user: UserEntity) {
        return await this.orderService.getAllOrders(user.id)
    }

    @Get('getOrderById/:id')
    @UseGuards(new RoleGuard('ADMIN'))
    @ApiResponse({ status: 200, description: "Order By Id" })
    async getOrderById(@Param('id', ParseIntPipe) orderId: number) {
        return await this.orderService.getOrderById(orderId)
    }

}
