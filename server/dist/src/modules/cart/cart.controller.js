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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const cart_service_1 = require("./cart.service");
const cart_dto_1 = require("./dto/cart.dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addCartItem(cartDto, user) {
        return await this.cartService.addItem(cartDto, user.id);
    }
    async getCartItem(user) {
        return await this.cartService.getItems(user.id);
    }
    async getProductCartInfo(user, productId) {
        return await this.cartService.getProductCartInfo(user.id, productId);
    }
    async updateQuantity(quantity, cartId) {
        return await this.cartService.updateQunatity(quantity, cartId);
    }
    async deleteCartItem(cartId) {
        return await this.cartService.deleteCartItem(cartId);
    }
    async deleteCartItemFromProduct(userInfo, productId) {
        return await this.cartService.deleteCartItemFromProduct(userInfo.id, productId);
    }
    async clearUserCart(userInfo) {
        return await this.cartService.clearUserCart(userInfo.id);
    }
};
__decorate([
    common_1.Post('/add'),
    swagger_1.ApiResponse({ status: 201, description: "Cart item created successfully" }),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartItemDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addCartItem", null);
__decorate([
    common_1.Get('/cartitems'),
    swagger_1.ApiResponse({ status: 200, description: "Get all Cart item of Current User" }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartItem", null);
__decorate([
    common_1.Get('/productInfo/:productId'),
    swagger_1.ApiResponse({ status: 200, description: "Get all Cart item of Current User" }),
    __param(0, decorators_1.AuthUser()), __param(1, common_1.Param('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getProductCartInfo", null);
__decorate([
    common_1.Put('/updatequantity/:cartId'),
    swagger_1.ApiResponse({ status: 200, description: "Quantity d Sucess" }),
    __param(0, common_1.Body()), __param(1, common_1.Param('cartId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.UpdateCartItemDto, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateQuantity", null);
__decorate([
    common_1.Delete('/delete/:cartId'),
    swagger_1.ApiResponse({ status: 200, description: "Quantity d Sucess" }),
    __param(0, common_1.Param('cartId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartItem", null);
__decorate([
    common_1.Delete('/delete-from-product/:productId'),
    swagger_1.ApiResponse({ status: 200, description: "Quantity d Sucess" }),
    __param(0, decorators_1.AuthUser()), __param(1, common_1.Param('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartItemFromProduct", null);
__decorate([
    common_1.Get('/clearCart'),
    swagger_1.ApiResponse({ status: 200, description: "Cart has been deleted" }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearUserCart", null);
CartController = __decorate([
    common_1.Controller('api/cart'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map