import { CartItemDto } from './dto/cart.dto';
import { CartItemRepository } from './repositories/cart.repository';
export declare class CartService {
    private carItemRepo;
    private logger;
    constructor(carItemRepo: CartItemRepository);
    addItem(cartDto: any, userId: any): Promise<CartItemDto>;
    getItems(userId: any): Promise<import("./cart.entity").CartItemEntity[]>;
    updateQunatity(quantity: any, cartId: any): Promise<import("./cart.entity").CartItemEntity | {
        success: boolean;
    }>;
    deleteCartItem(id: number): Promise<any>;
    getProductCartInfo(userId: any, prodId: any): Promise<import("./cart.entity").CartItemEntity>;
    deleteCartItemFromProduct(userId: any, productId: any): Promise<import("typeorm").DeleteResult>;
    clearUserCart(userId: any): Promise<import("typeorm").DeleteResult>;
}
