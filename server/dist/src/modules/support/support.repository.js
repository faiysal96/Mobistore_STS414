"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRepository = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const support_dto_1 = require("./support.dto");
const support_entity_1 = require("./support.entity");
let SupportRepository = class SupportRepository extends typeorm_1.Repository {
    async addSupportIsuue(supportDto, userId) {
        const { title, description } = supportDto;
        const supoortEntity = new support_entity_1.SupportEntity();
        supoortEntity.title = title;
        supoortEntity.description = description;
        supoortEntity.userId = userId;
        supoortEntity.status = 'PENDING';
        try {
            const createProduct = await this.save(supoortEntity);
            return class_transformer_1.plainToClass(support_dto_1.SupportDto, createProduct);
        }
        catch (error) {
            throw new common_2.InternalServerErrorException();
        }
    }
    async updateSupportConversion(conv, id) {
        let issue = await this.findOne(id);
        if (!issue) {
            throw new common_1.NotFoundException(`Support Issue with ID "${id}" not found`);
        }
        try {
            this.merge(issue, { conversation: JSON.stringify(conv) });
            const updateIssue = await this.save(issue);
            return updateIssue;
        }
        catch (error) {
            throw new common_2.InternalServerErrorException();
        }
    }
    async updateSupportStatus(status, id) {
        let issue = await this.findOne(id);
        if (!issue) {
            throw new common_1.NotFoundException(`Support Issue with ID "${id}" not found`);
        }
        try {
            this.merge(issue, { status });
            const updateIssue = await this.save(issue);
            return updateIssue;
        }
        catch (error) {
            throw new common_2.InternalServerErrorException();
        }
    }
};
SupportRepository = __decorate([
    typeorm_1.EntityRepository(support_entity_1.SupportEntity)
], SupportRepository);
exports.SupportRepository = SupportRepository;
//# sourceMappingURL=support.repository.js.map