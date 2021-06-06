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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../repositories/user.repository");
const user_dto_1 = require("../dto/user.dto");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('UserService');
    }
    async getUsers({ page, limit }) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        try {
            const users = await queryBuilder
                .leftJoinAndSelect("user.products", "products")
                .leftJoinAndSelect("user.orders", "orders")
                .skip(limit * (page - 1))
                .take(limit)
                .getMany();
            this.logger.log(users, "----------");
            console.log(users, "=============   ========   ======");
            return class_transformer_1.plainToClass(user_dto_1.UserDto, users);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getUserById(id, user) {
        const found = await this.userRepository.findOne({ where: { id } });
        console.log(found, "__________________________");
        this.logger.log(found, "---");
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return class_transformer_1.plainToClass(user_dto_1.UserDto, found);
    }
    async deleteUser(id, user) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return Promise.resolve({
            result: result,
            status: 'succes'
        });
    }
    async createUser(createUserDto, user) {
        return this.userRepository.createUser(createUserDto, user);
    }
    async updateUser(id, updateUserDto) {
        const found = await this.userRepository.findOne({ where: { id } });
        console.log(found, "---", updateUserDto);
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        try {
            this.userRepository.merge(found, updateUserDto);
            const result = await this.userRepository.save(found);
            return class_transformer_1.plainToClass(user_dto_1.UserDto, result);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map