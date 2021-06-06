"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../../user/user.entity");
let AuthRepository = class AuthRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('AuthRepository');
    }
    async signUp(registerCredentialsDto) {
        const { email, password } = registerCredentialsDto;
        const user = new user_entity_1.UserEntity();
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.firstName = registerCredentialsDto.firstName;
        user.lastName = registerCredentialsDto.lastName;
        user.phone = registerCredentialsDto.phone;
        try {
            const registredUser = await this.save(user);
            return { email: registredUser.email, role: registredUser.role, name: registredUser.firstName + ' ' + registredUser.lastName };
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async validateUserPassword(loginCredentialsDto) {
        const { email, password } = loginCredentialsDto;
        const user = await this.findOne({ email });
        if (user && await user.validatePassword(password)) {
            return { email: user.email, role: user.role, name: user.firstName + ' ' + user.lastName };
        }
        return { email: null };
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
AuthRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.UserEntity)
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map