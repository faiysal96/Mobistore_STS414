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
exports.SeederService = void 0;
const user_entity_1 = require("../../modules/user/user.entity");
const user_repository_1 = require("../../modules/user/repositories/user.repository");
const common_1 = require("@nestjs/common");
let users = [
    {
        firstName: 'Admin',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test@admin.com',
        phone: '+1-033-09-090-8',
        role: 'ADMIN'
    },
    {
        firstName: 'User',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test@user.com',
        phone: '+1-033-09-090-8',
        role: 'GHOST'
    },
    {
        firstName: 'User2',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test1@user.com',
        phone: '+1-033-09-090-8',
        role: 'GHOST'
    },
    {
        firstName: 'Manger',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test@manager.com',
        phone: '+1-033-09-090-8',
        role: 'MANAGER'
    },
    {
        firstName: 'Manger2',
        lastName: 'Test',
        password: 'Test@1234',
        email: 'test1@manager.com',
        phone: '+1-033-09-090-8',
        role: 'MANAGER'
    }
];
let SeederService = class SeederService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async run() {
        try {
            let user_list = [];
            for (let index = 0; index < users.length; index++) {
                let user = new user_entity_1.UserEntity();
                user.firstName = user[index].firstName;
                user.lastName = user[index].firstName;
                user.role = user[index].firstName;
                user.email = user[index].firstName;
                user.password = user[index].password;
            }
            await this.userRepo.save(user_list);
            return { sucess: false, error: '' };
        }
        catch (error) {
            return { sucess: false, error: error };
        }
    }
};
SeederService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], SeederService);
exports.SeederService = SeederService;
//# sourceMappingURL=user.seed.js.map