import { CartService } from './cart.service';
import { CartItemDto, UpdateCartItemDto } from './dto/cart.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addCartItem(cartDto: CartItemDto, user: any): Promise<CartItemDto>;
    getCartItem(user: any): Promise<import("./cart.entity").CartItemEntity[]>;
    getProductCartInfo(user: any, productId: number): Promise<import("./cart.entity").CartItemEntity>;
    updateQuantity(quantity: UpdateCartItemDto, cartId: number): Promise<import("./cart.entity").CartItemEntity | {
        success: boolean;
    }>;
    deleteCartItem(cartId: number): Promise<any>;
    deleteCartItemFromProduct(userInfo: any, productId: number): Promise<import("typeorm").DeleteResult>;
    clearUserCart(userInfo: any): Promise<import("typeorm").DeleteResult>;
}
