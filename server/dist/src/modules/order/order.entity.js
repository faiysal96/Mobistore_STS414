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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const user_entity_1 = require("../user/user.entity");
const orderitem_entity_1 = require("./orderitem.entity");
let OrderEntity = class OrderEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OrderEntity.prototype, "order_to_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: 'CARD' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "paymentMethod", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OrderEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "notes", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "prize", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, user => user.orders, {
        onDelete: 'NO ACTION',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => orderitem_entity_1.OrderItemEntity, orderItem => orderItem.id, { cascade: true }),
    __metadata("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], OrderEntity.prototype, "orderItems", void 0);
OrderEntity = __decorate([
    typeorm_1.Entity({ name: 'order' })
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map