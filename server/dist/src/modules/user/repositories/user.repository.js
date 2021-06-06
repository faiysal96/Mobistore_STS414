"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
const user_dto_1 = require("../dto/user.dto");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('UserRepository');
    }
    async createUser(createUserDto, user) {
        const { email, password, firstName, lastName, phone, role } = createUserDto;
        const userEntity = new user_entity_1.UserEntity();
        userEntity.email = email;
        userEntity.salt = await bcrypt.genSalt();
        userEntity.password = await bcrypt.hash(password, user.salt);
        userEntity.firstName = firstName;
        userEntity.lastName = lastName;
        userEntity.phone = phone;
        userEntity.role = role;
        try {
            const createdUser = await this.save(userEntity);
            return class_transformer_1.plainToClass(user_dto_1.UserDto, createdUser);
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
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.UserEntity)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map