import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { userInfo } from 'os';
import { AuthUser } from 'src/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CartService } from './cart.service';
import { CartItemDto, UpdateCartItemDto } from './dto/cart.dto';

@Controller('api/cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {

    constructor(private cartService: CartService) { }

    @Post('/add')
    @ApiResponse({ status: 201, description: "Cart item created successfully" })
    @UsePipes(ValidationPipe)
    async addCartItem(@Body() cartDto: CartItemDto, @AuthUser() user) {
        return await this.cartService.addItem(cartDto, user.id)
    }

    @Get('/cartitems')
    @ApiResponse({ status: 200, description: "Get all Cart item of Current User" })
    async getCartItem(@AuthUser() user) {
        return await this.cartService.getItems(user.id)
    }

    @Get('/productInfo/:productId')
    @ApiResponse({ status: 200, description: "Get all Cart item of Current User" })
    async getProductCartInfo(@AuthUser() user, @Param('productId', ParseIntPipe) productId: number) {
        return await this.cartService.getProductCartInfo(user.id, productId)
    }

    @Put('/updatequantity/:cartId')
    @ApiResponse({ status: 200, description: "Quantity d Sucess" })
    async updateQuantity(@Body() quantity: UpdateCartItemDto, @Param('cartId', ParseIntPipe) cartId: number) {
        return await this.cartService.updateQunatity(quantity, cartId)
    }

    @Delete('/delete/:cartId')
    @ApiResponse({ status: 200, description: "Quantity d Sucess" })
    async deleteCartItem(@Param('cartId', ParseIntPipe) cartId: number) {
        return await this.cartService.deleteCartItem(cartId)
    }

    @Delete('/delete-from-product/:productId')
    @ApiResponse({ status: 200, description: "Quantity d Sucess" })
    async deleteCartItemFromProduct(@AuthUser() userInfo, @Param('productId', ParseIntPipe) productId: number) {
        return await this.cartService.deleteCartItemFromProduct(userInfo.id, productId)
    }

    @Get('/clearCart')
    @ApiResponse({ status: 200, description: "Cart has been deleted" })
    async clearUserCart(@AuthUser() userInfo) {
        return await this.cartService.clearUserCart(userInfo.id)
    }


}
