"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_repository_1 = require("./repositories/product.repository");
const productimage_repository_1 = require("./repositories/productimage.repository");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_repository_1.ProductRepository, productimage_repository_1.ProductImageRepository]),
            platform_express_1.MulterModule.register({
                storage: multer_1.diskStorage({
                    destination: 'public/media',
                    filename: function (req, file, cb) {
                        cb(null, Date.now() + '-' + file.originalname.replace(' ', '-'));
                    }
                })
            }),
        ],
        providers: [product_service_1.ProductService],
        controllers: [product_controller_1.ProductController]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map