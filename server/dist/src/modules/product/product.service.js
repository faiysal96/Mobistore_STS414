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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const product_repository_1 = require("./repositories/product.repository");
const productimage_repository_1 = require("./repositories/productimage.repository");
const fs = require("fs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productimage_entity_1 = require("./productimage.entity");
let ProductService = class ProductService {
    constructor(productRepository, productImageRepo) {
        this.productRepository = productRepository;
        this.productImageRepo = productImageRepo;
    }
    async getAll(query) {
        if (!query) {
            return await this.productRepository.find({ where: { stock: typeorm_2.MoreThan(0) }, relations: ['images'], order: { updatedAt: 'DESC' } });
        }
        return await this.productRepository.find({ where: { name: typeorm_2.Like(`%${query}%`), stock: typeorm_2.MoreThan(0) }, relations: ['images'] });
    }
    async getById(id) {
        return await this.productRepository.findOne({ relations: ['images'], where: { id } });
    }
    async getSellerProducts(userId) {
        return await this.productRepository.find({ relations: ['images'], where: { user: userId }, order: { updatedAt: 'DESC' } });
    }
    async addProduct(product, userId) {
        const productEntity = await this.productRepository.addProduct(product, userId);
        await this.productImageRepo.addImages(product.images, productEntity.id);
        return productEntity;
    }
    async updateProduct(product, id) {
        return await this.productRepository.updateProduct(product, id);
    }
    async deleteProduct(id) {
        const result = await this.productRepository.delete(id);
        const imageIds = (await this.productImageRepo.find({ where: { product: id } })).map((productImage) => productImage.id);
        let images = await this.productImageRepo.delete(imageIds);
        this.removeImages(images);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with ID "${id}" not found`);
        }
        return Promise.resolve({
            result: result,
            status: 'success'
        });
    }
    removeImages(images) {
        try {
            images.forEach((element) => {
                fs.unlinkSync(element.path);
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    addImage(image) {
        var _a;
        const path = (_a = process.env.MEDIA_PATH) !== null && _a !== void 0 ? _a : 'media';
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        return { success: true };
    }
    async updateProductImages(paths, id) {
        paths.forEach(async (path) => {
            let image = new productimage_entity_1.ProductImageEntity();
            image.product = id;
            image.path = path;
            this.productImageRepo.save(image);
        });
        return {
            sucess: true
        };
    }
    async removeImageFromProduct(paths) {
        let images = await this.productImageRepo.createQueryBuilder()
            .where(`path IN (:paths)`, { paths })
            .getMany();
        return await this.productImageRepo.delete(images.map(i => i.id));
    }
};
ProductService = __decorate([
    common_2.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_repository_1.ProductRepository)),
    __param(1, typeorm_1.InjectRepository(productimage_repository_1.ProductImageRepository)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        productimage_repository_1.ProductImageRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map