"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRepository = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const cart_entity_1 = require("../cart.entity");
const common_1 = require("@nestjs/common");
const cart_dto_1 = require("../dto/cart.dto");
const common_2 = require("@nestjs/common");
let CartItemRepository = class CartItemRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CartRepository');
    }
    async getCartItems(userId) {
        return this.find({ where: { userId: userId, quantity: typeorm_1.MoreThan(0) }, relations: ['product', 'product.images'] });
    }
    async createCartItem(cartItem, userid) {
        const { quantity, product } = cartItem;
        let cartItemEntity = await this.findOne({ where: { productId: product, userId: userid } });
        if (!cartItemEntity) {
            cartItemEntity = new cart_entity_1.CartItemEntity();
            cartItemEntity.quantity = quantity;
            cartItemEntity.productId = product;
            cartItemEntity.userId = userid;
        }
        cartItemEntity.quantity = quantity;
        try {
            const cartItemCreated = await this.save(cartItemEntity);
            return class_transformer_1.plainToClass(cart_dto_1.CartItemDto, cartItemCreated);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            else {
                throw new common_2.InternalServerErrorException();
            }
        }
    }
    async updateCartItemQuantity() {
        try {
            return;
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            else {
                throw new common_2.InternalServerErrorException();
            }
        }
    }
    async updateQuantity(quantity, cartId) {
        const cartItem = await this.findOne(cartId);
        cartItem.quantity = quantity.quantity;
        if (cartItem) {
            return await this.save(cartItem);
        }
        return { success: false };
    }
};
CartItemRepository = __decorate([
    typeorm_1.EntityRepository(cart_entity_1.CartItemEntity)
], CartItemRepository);
exports.CartItemRepository = CartItemRepository;
//# sourceMappingURL=cart.repository.js.map