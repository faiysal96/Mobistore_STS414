import { Repository } from 'typeorm';
import { CartItemEntity } from '../cart.entity';
import { CartItemDto, UpdateCartItemDto } from '../dto/cart.dto';
export declare class CartItemRepository extends Repository<CartItemEntity> {
    private logger;
    getCartItems(userId: any): Promise<CartItemEntity[]>;
    createCartItem(cartItem: CartItemDto, userid: any): Promise<CartItemDto>;
    updateCartItemQuantity(): Promise<CartItemDto>;
    updateQuantity(quantity: UpdateCartItemDto, cartId: any): Promise<CartItemEntity | {
        success: boolean;
    }>;
}
