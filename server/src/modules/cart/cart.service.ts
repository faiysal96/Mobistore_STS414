import { Logger, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CartItemDto } from './dto/cart.dto';
import { CartItemRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
    private logger = new Logger('CartService');

    constructor(private carItemRepo: CartItemRepository) {

    }

    async addItem(cartDto, userId) {
        return await this.carItemRepo.createCartItem(cartDto, userId);
    }

    async getItems(userId) {
        return await this.carItemRepo.getCartItems(userId);
    }

    async updateQunatity(quantity, cartId) {
        return await this.carItemRepo.updateQuantity(quantity, cartId);
    }

    async deleteCartItem(id: number): Promise<any> {
        const result = await this.carItemRepo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`CartItem with ID "${id}" not found`);
        }

        return Promise.resolve({
            result: result,
            status: 'succes'
        });
    }

    async getProductCartInfo(userId, prodId) {
        return this.carItemRepo.findOne({ where: { userId: userId, productId: prodId } })
    }

    async deleteCartItemFromProduct(userId, productId) {
        let items = await this.carItemRepo.findOne({ where: { userId: userId, productId: productId } })
        return await this.carItemRepo.delete(items.id);
    }

    async clearUserCart(userId) {
        let items = await this.carItemRepo.find({ where: { userId: userId } })
        return await this.carItemRepo.delete(items.map(i => i.id));
    }

}
