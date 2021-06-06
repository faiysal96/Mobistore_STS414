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
exports.CartItemEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../user/user.entity");
let CartItemEntity = class CartItemEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "quantity", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, user => user.cartItems, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], CartItemEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "productId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => product_entity_1.ProductEntity, product => product.cartItems, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", product_entity_1.ProductEntity)
], CartItemEntity.prototype, "product", void 0);
CartItemEntity = __decorate([
    typeorm_1.Entity({ name: 'cart' })
], CartItemEntity);
exports.CartItemEntity = CartItemEntity;
//# sourceMappingURL=cart.entity.js.map