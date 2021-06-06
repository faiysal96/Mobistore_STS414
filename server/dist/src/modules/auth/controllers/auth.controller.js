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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const guards_1 = require("../../../common/guards");
const decorators_1 = require("../../../common/decorators");
const user_entity_1 = require("../../user/user.entity");
const login_credentials_dto_1 = require("../dto/login-credentials.dto");
const register_credentials_dto_1 = require("../dto/register-credentials.dto");
const user_dto_1 = require("../../user/dto/user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(registerCredentialsDto) {
        return this.authService.signUp(registerCredentialsDto);
    }
    signIn(loginCredentialsDto) {
        return this.authService.signIn(loginCredentialsDto);
    }
    getAuthenticatedUser(user) {
        return this.authService.getAuthenticatedUser(user);
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_credentials_dto_1.RegisterCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('/signin'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Get('/authenticated'),
    common_1.UseGuards(guards_1.AuthGuard),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", user_dto_1.UserDto)
], AuthController.prototype, "getAuthenticatedUser", null);
AuthController = __decorate([
    common_1.Controller('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map