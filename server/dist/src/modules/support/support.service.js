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
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const support_repository_1 = require("./support.repository");
let SupportService = class SupportService {
    constructor(supportRepo) {
        this.supportRepo = supportRepo;
    }
    async getById(id) {
        return await this.supportRepo.findOne(id);
    }
    async getAll() {
        return await this.supportRepo.find({
            order: {
                updatedAt: "DESC"
            },
            relations: ['user']
        });
    }
    async getByUser(userId) {
        return await this.supportRepo.find({
            where: { userId }, order: {
                updatedAt: "DESC"
            }
        });
    }
    async getByPendingStatusUser(userId) {
        return await this.supportRepo.find({
            where: { userId, status: 'PENDING' }, order: {
                updatedAt: "DESC"
            }
        });
    }
    async addSupportIsuue(supportDto, userId) {
        return await this.supportRepo.addSupportIsuue(supportDto, userId);
    }
    async updateSupportConversion(conv, id) {
        return await this.supportRepo.updateSupportConversion(conv, id);
    }
    async updateSupportStatus(status, id) {
        return await this.supportRepo.updateSupportStatus(status, id);
    }
};
SupportService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(support_repository_1.SupportRepository)),
    __metadata("design:paramtypes", [support_repository_1.SupportRepository])
], SupportService);
exports.SupportService = SupportService;
//# sourceMappingURL=support.service.js.map