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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/user.entity");
const auth_repository_1 = require("../repositories/auth.repository");
const user_dto_1 = require("../../user/dto/user.dto");
const class_transformer_1 = require("class-transformer");
let AuthService = class AuthService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    async signUp(registerCredentialsDto) {
        let { email, role, name } = await this.authRepository.signUp(registerCredentialsDto);
        const payload = { email, role };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
        return { accessToken, role, name };
    }
    async signIn(loginCredentialsDto) {
        const { email, role, name } = await this.authRepository.validateUserPassword(loginCredentialsDto);
        if (!email) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email, role };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken, role, name };
    }
    getAuthenticatedUser(user) {
        return class_transformer_1.plainToClass(user_dto_1.UserDto, user);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(auth_repository_1.AuthRepository)),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map