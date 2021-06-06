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
exports.SupportEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const user_entity_1 = require("../user/user.entity");
let SupportEntity = class SupportEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], SupportEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], SupportEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, length: 2200, default: '[]' }),
    __metadata("design:type", String)
], SupportEntity.prototype, "conversation", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, enum: ['RESOLVED', 'PENDING'], default: 'PENDING' }),
    __metadata("design:type", String)
], SupportEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Number)
], SupportEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, user => user.issues),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.UserEntity)
], SupportEntity.prototype, "user", void 0);
SupportEntity = __decorate([
    typeorm_1.Entity({ name: 'support' })
], SupportEntity);
exports.SupportEntity = SupportEntity;
//# sourceMappingURL=support.entity.js.map