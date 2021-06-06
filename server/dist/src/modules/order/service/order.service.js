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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const order_dto_1 = require("../dto/order.dto");
const order_entity_1 = require("../order.entity");
const order_repository_1 = require("../order.repository");
const orderitem_entity_1 = require("../orderitem.entity");
const orderitem_repository_1 = require("../orderitem.repository");
let OrderService = class OrderService {
    constructor(orderRepository, orderItemRepo) {
        this.orderRepository = orderRepository;
        this.orderItemRepo = orderItemRepo;
    }
    async addOrders(orderDto, userId) {
        let { order_to_name, phone, paymentMethod, status, address, notes, prize, orderItems } = orderDto;
        if (!orderItems.length) {
            return new common_1.BadRequestException("Need Atleast one item to place order");
        }
        let order = new order_entity_1.OrderEntity();
        order.order_to_name = order_to_name;
        order.phone = phone;
        order.paymentMethod = paymentMethod;
        order.userId = userId;
        order.status = status;
        order.address = address;
        order.notes = notes;
        order.prize = prize;
        let userOrder = await this.orderRepository.save(order);
        orderItems.forEach(async (item) => {
            let orderItem = new orderitem_entity_1.OrderItemEntity();
            orderItem.quantity = item.quantity;
            orderItem.productId = item.product;
            orderItem.orderId = userOrder.id;
            await this.orderItemRepo.save(orderItem);
        });
        return class_transformer_1.plainToClass(order_dto_1.OrderDto, order);
    }
    async updateOrder(orderDto, id) {
        let { status } = orderDto;
        let order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            return new common_1.NotFoundException("Order Does Not Exist");
        }
        order.status = status;
        let userOrder = await this.orderRepository.save(order);
        return class_transformer_1.plainToClass(order_dto_1.OrderDto, userOrder);
    }
    async getUserPlaceOrder(userId) {
        let orders = await this.orderRepository.find({ where: { userId }, order: { updatedAt: 'DESC' }, select: ['id', 'order_to_name', 'prize', 'phone', 'paymentMethod', 'address', 'updatedAt', 'status'] });
        return orders;
    }
    async getAllOrders(userId) {
        let orders = await this.orderRepository.find({ order: { updatedAt: 'DESC' }, select: ['id', 'order_to_name', 'prize', 'phone', 'paymentMethod', 'address', 'updatedAt', 'status'] });
        return orders;
    }
    async getOrderById(id) {
        let order = await this.orderRepository.findOne({ where: { id }, relations: ['user'] });
        let orderItems = await this.orderItemRepo.find({ where: { order: order }, relations: ['product'] });
        return Object.assign(Object.assign({}, order), { orderItems });
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(order_repository_1.OrderRepository)),
    __param(1, typeorm_1.InjectRepository(orderitem_repository_1.OrderItemRepository)),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        orderitem_repository_1.OrderItemRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map