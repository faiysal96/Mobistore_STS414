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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const product_dto_1 = require("../dto/product.dto");
const product_entity_1 = require("../product.entity");
const productimage_repository_1 = require("./productimage.repository");
let ProductRepository = class ProductRepository extends typeorm_2.Repository {
    constructor(productImageRepo) {
        super();
        this.productImageRepo = productImageRepo;
        this.logger = new common_2.Logger('ProductRepository');
    }
    async addProduct(product, userId) {
        const { name, description, prize, stock } = product;
        const productEntity = new product_entity_1.ProductEntity();
        productEntity.name = name;
        productEntity.description = description;
        productEntity.prize = prize;
        productEntity.stock = stock;
        productEntity.user = userId;
        try {
            const createProduct = await this.save(productEntity);
            return class_transformer_1.plainToClass(product_dto_1.CreatedProductDto, createProduct);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_2.InternalServerErrorException();
        }
    }
    async updateProduct(productDto, id) {
        let product = await this.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID "${id}" not found`);
        }
        try {
            this.merge(product, productDto);
            const updateProduct = await this.save(product);
            return class_transformer_1.plainToClass(product_dto_1.ProductDto, updateProduct);
        }
        catch (error) {
            this.logger.error(error.message, error.stack);
            throw new common_2.InternalServerErrorException();
        }
    }
};
ProductRepository = __decorate([
    typeorm_2.EntityRepository(product_entity_1.ProductEntity),
    __param(0, typeorm_1.InjectRepository(productimage_repository_1.ProductImageRepository)),
    __metadata("design:paramtypes", [productimage_repository_1.ProductImageRepository])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map