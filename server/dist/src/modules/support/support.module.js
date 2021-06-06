"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportModule = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const support_controller_1 = require("./support.controller");
const typeorm_1 = require("@nestjs/typeorm");
const support_repository_1 = require("./support.repository");
let SupportModule = class SupportModule {
};
SupportModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([support_repository_1.SupportRepository])
        ],
        providers: [support_service_1.SupportService],
        controllers: [support_controller_1.SupportController]
    })
], SupportModule);
exports.SupportModule = SupportModule;
//# sourceMappingURL=support.module.js.map