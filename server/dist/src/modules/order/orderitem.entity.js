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
exports.OrderItemEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const product_entity_1 = require("../product/product.entity");
const order_entity_1 = require("./order.entity");
let OrderItemEntity = class OrderItemEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "productId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], OrderItemEntity.prototype, "orderId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => order_entity_1.OrderEntity, order => order.orderItems, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", order_entity_1.OrderEntity)
], OrderItemEntity.prototype, "order", void 0);
__decorate([
    typeorm_1.ManyToOne(() => product_entity_1.ProductEntity, product => product.orderItems, { onDelete: 'NO ACTION', }),
    __metadata("design:type", product_entity_1.ProductEntity)
], OrderItemEntity.prototype, "product", void 0);
OrderItemEntity = __decorate([
    typeorm_1.Entity({ name: 'order_item' })
], OrderItemEntity);
exports.OrderItemEntity = OrderItemEntity;
//# sourceMappingURL=orderitem.entity.js.map