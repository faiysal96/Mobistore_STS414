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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_role_enum_1 = require("./user-role.enum");
const abstract_entity_1 = require("../../common/abstract.entity");
const product_entity_1 = require("../product/product.entity");
const cart_entity_1 = require("../cart/cart.entity");
const order_entity_1 = require("../order/order.entity");
const support_entity_1 = require("../support/support.entity");
let UserEntity = class UserEntity extends abstract_entity_1.AbstractEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({ default: '', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.USER
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(type => product_entity_1.ProductEntity, product => product.id, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "products", void 0);
__decorate([
    typeorm_1.OneToMany(type => cart_entity_1.CartItemEntity, cart => cart.id, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "cartItems", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_entity_1.OrderEntity, order => order.id, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToMany(type => support_entity_1.SupportEntity, issue => issue.id, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], UserEntity.prototype, "issues", void 0);
UserEntity = __decorate([
    typeorm_1.Entity({ name: 'user' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map