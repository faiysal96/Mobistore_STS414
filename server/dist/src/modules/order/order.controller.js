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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const guards_1 = require("../../common/guards");
const user_entity_1 = require("../user/user.entity");
const order_dto_1 = require("./dto/order.dto");
const order_service_1 = require("./service/order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async placeOrder(orderDto, user) {
        return await this.orderService.addOrders(orderDto, user.id);
    }
    async updateOrder(orderDto, orderId) {
        return await this.orderService.updateOrder(orderDto, orderId);
    }
    async getUserPlaceOrder(user) {
        return await this.orderService.getUserPlaceOrder(user.id);
    }
    async getAllOrders(user) {
        return await this.orderService.getAllOrders(user.id);
    }
    async getOrderById(orderId) {
        return await this.orderService.getOrderById(orderId);
    }
};
__decorate([
    common_1.Post('add'),
    swagger_1.ApiResponse({ status: 201, description: "Order Placed Successfully" }),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderDto, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "placeOrder", null);
__decorate([
    common_1.Put('update/:id'),
    swagger_1.ApiResponse({ status: 201, description: "Order updated Successfully" }),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.UpdateOrderDto, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    common_1.Get('getUserOrders'),
    swagger_1.ApiResponse({ status: 200, description: "Order List" }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserPlaceOrder", null);
__decorate([
    common_1.Get('getAllOrders'),
    common_1.UseGuards(new guards_1.RoleGuard('ADMIN')),
    swagger_1.ApiResponse({ status: 200, description: "Order List" }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    common_1.Get('getOrderById/:id'),
    common_1.UseGuards(new guards_1.RoleGuard('ADMIN')),
    swagger_1.ApiResponse({ status: 200, description: "Order By Id" }),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
OrderController = __decorate([
    common_1.Controller('api/order'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map