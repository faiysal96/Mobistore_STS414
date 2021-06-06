import { CartService } from './cart.service';
import { CartItemDto, UpdateCartItemDto } from './dto/cart.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addCartItem(cartDto: CartItemDto, user: any): unknown;
    getCartItem(user: any): unknown;
    getProductCartInfo(user: any, productId: number): unknown;
    updateQuantity(quantity: UpdateCartItemDto, cartId: number): unknown;
    deleteCartItem(cartId: number): unknown;
    deleteCartItemFromProduct(userInfo: any, productId: number): unknown;
    clearUserCart(userInfo: any): unknown;
}
