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
exports.SupportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_entity_1 = require("../user/user.entity");
const support_dto_1 = require("./support.dto");
const support_service_1 = require("./support.service");
let SupportController = class SupportController {
    constructor(supportService) {
        this.supportService = supportService;
    }
    async getAll() {
        return await this.supportService.getAll();
    }
    async getMyPendingIssues(user) {
        return await this.supportService.getByPendingStatusUser(user.id);
    }
    async getMyIssues(user) {
        return await this.supportService.getByUser(user.id);
    }
    async getById(user, issueId) {
        return await this.supportService.getById(issueId);
    }
    async getSellerProducts(user, issue) {
        return await this.supportService.addSupportIsuue(issue, user.id);
    }
    async updateIssueConv(user, issueId, conv) {
        return await this.supportService.updateSupportConversion(conv, issueId);
    }
    async updateIssueStatus(user, issueId, status) {
        return await this.supportService.updateSupportStatus(status.status, issueId);
    }
};
__decorate([
    common_1.Get('getAll'),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getAll", null);
__decorate([
    common_1.Get('getMyPendingIssues'),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getMyPendingIssues", null);
__decorate([
    common_1.Get('getMyIssues'),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getMyIssues", null);
__decorate([
    common_1.Get('getIssueById/:id'),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    __param(0, decorators_1.AuthUser()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getById", null);
__decorate([
    common_1.Post('addIssue'),
    swagger_1.ApiResponse({ status: 200, description: 'Get Seller Products' }),
    __param(0, decorators_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, support_dto_1.SupportDto]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getSellerProducts", null);
__decorate([
    common_1.Post('updateIssueConv/:issueId'),
    swagger_1.ApiResponse({ status: 200, description: 'Get Seller Products' }),
    __param(0, decorators_1.AuthUser()), __param(1, common_1.Param('issueId', common_1.ParseIntPipe)), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, Array]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "updateIssueConv", null);
__decorate([
    common_1.Post('updateIssueStatus/:issueId'),
    swagger_1.ApiResponse({ status: 200, description: 'Get Seller Products' }),
    __param(0, decorators_1.AuthUser()), __param(1, common_1.Param('issueId', common_1.ParseIntPipe)), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, support_dto_1.StatusSupportDto]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "updateIssueStatus", null);
SupportController = __decorate([
    common_1.Controller('api/support'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportController);
exports.SupportController = SupportController;
//# sourceMappingURL=support.controller.js.map