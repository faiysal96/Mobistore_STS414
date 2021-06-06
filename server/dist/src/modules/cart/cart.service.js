"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const cart_repository_1 = require("./repositories/cart.repository");
let CartService = class CartService {
    constructor(carItemRepo) {
        this.carItemRepo = carItemRepo;
        this.logger = new common_1.Logger('CartService');
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
    async deleteCartItem(id) {
        const result = await this.carItemRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`CartItem with ID "${id}" not found`);
        }
        return Promise.resolve({
            result: result,
            status: 'succes'
        });
    }
    async getProductCartInfo(userId, prodId) {
        return this.carItemRepo.findOne({ where: { userId: userId, productId: prodId } });
    }
    async deleteCartItemFromProduct(userId, productId) {
        let items = await this.carItemRepo.findOne({ where: { userId: userId, productId: productId } });
        return await this.carItemRepo.delete(items.id);
    }
    async clearUserCart(userId) {
        let items = await this.carItemRepo.find({ where: { userId: userId } });
        return await this.carItemRepo.delete(items.map(i => i.id));
    }
};
CartService = __decorate([
    common_2.Injectable(),
    __metadata("design:paramtypes", [cart_repository_1.CartItemRepository])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map