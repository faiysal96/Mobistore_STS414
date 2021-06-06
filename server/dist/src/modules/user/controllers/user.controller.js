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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const decorators_1 = require("../../../common/decorators");
const user_entity_1 = require("../user.entity");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../common/guards");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger('UserController');
    }
    deleteUser(id, user) {
        return this.userService.deleteUser(id, user);
    }
    updateUserInfo(updateUserDto, user) {
        console.log("WDFdsfsdfsd");
        return this.userService.updateUser(user.id, updateUserDto);
    }
    getUser(id, user) {
        return this.userService.getUserById(id, user);
    }
    getUsers(page = 1, limit = 10) {
        return this.userService.getUsers({
            page,
            limit
        });
    }
    createUser(createUserDto, user) {
        return this.userService.createUser(createUserDto, user);
    }
};
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(new guards_1.RoleGuard('ADMIN')),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Put('update'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInfo", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Get(''),
    swagger_1.ApiOkResponse(),
    swagger_1.ApiUnauthorizedResponse(),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    common_1.Post(''),
    swagger_1.ApiCreatedResponse({ description: 'The record has been successfully created.' }),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
UserController = __decorate([
    common_1.Controller('api/users'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map