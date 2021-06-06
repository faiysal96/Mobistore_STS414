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
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const cart_entity_1 = require("../cart/cart.entity");
const user_entity_1 = require("../user/user.entity");
const productimage_entity_1 = require("./productimage.entity");
let ProductEntity = class ProductEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stock", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "prize", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, user => user.products),
    __metadata("design:type", user_entity_1.UserEntity)
], ProductEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => productimage_entity_1.ProductImageEntity, productImage => productImage.product, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], ProductEntity.prototype, "images", void 0);
__decorate([
    typeorm_1.OneToMany(() => productimage_entity_1.ProductImageEntity, productImage => productImage.product, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], ProductEntity.prototype, "orderItems", void 0);
__decorate([
    typeorm_1.OneToMany(() => cart_entity_1.CartItemEntity, cartItem => cartItem.product, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], ProductEntity.prototype, "cartItems", void 0);
ProductEntity = __decorate([
    typeorm_1.Entity({ name: 'product' })
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map