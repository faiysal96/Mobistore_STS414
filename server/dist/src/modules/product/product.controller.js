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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const file_upload_swagger_decorator_1 = require("../../common/decorators/file-upload-swagger.decorator");
const guards_1 = require("../../common/guards");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_role_enum_1 = require("../user/user-role.enum");
const user_entity_1 = require("../user/user.entity");
const product_dto_1 = require("./dto/product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getPosts(query) {
        return await this.productService.getAll(query.query);
    }
    async getById(productId) {
        return await this.productService.getById(productId);
    }
    async getSellerProducts(user) {
        return await this.productService.getSellerProducts(user.id);
    }
    async addProduct(productInfo, user) {
        return await this.productService.addProduct(productInfo, user.id);
    }
    async updateProduct(productDto, id) {
        return this.productService.updateProduct(productDto, id);
    }
    async updateProductImages(filePaths, id) {
        return this.productService.updateProductImages(filePaths, id);
    }
    async deleteProduct(productId) {
        return await this.productService.deleteProduct(productId);
    }
    uploadFile(files) {
        return files.map(file => file.filename);
    }
    async removeProductImages(fileList) {
        await this.productService.removeImageFromProduct(fileList);
        return {
            success: true
        };
    }
};
__decorate([
    common_1.Get('getAll'),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPosts", null);
__decorate([
    common_1.Get('getById/:productId'),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    __param(0, common_1.Param('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getById", null);
__decorate([
    common_1.Get('getSellerProducts'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    swagger_1.ApiResponse({ status: 200, description: 'Get Seller Products' }),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getSellerProducts", null);
__decorate([
    common_1.Post('add'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    common_1.UsePipes(common_1.ValidationPipe),
    swagger_1.ApiResponse({ status: 200, description: 'Get All Products' }),
    swagger_1.ApiResponse({ status: 403, description: 'Role is limited to ADMIN and MANGER' }),
    __param(0, common_1.Body()), __param(1, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    common_1.Post('update/:productId'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    swagger_1.ApiResponse({ status: 200, description: 'Get All Products' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.Param('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductDto, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Post('updateProductImages/:productId'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    swagger_1.ApiResponse({ status: 200, description: 'Get All Products' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.Param('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductImages", null);
__decorate([
    common_1.Delete('delete/:productId'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    swagger_1.ApiResponse({ status: 204, description: 'Deleted product' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Param('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    common_1.Post('upload'),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    file_upload_swagger_decorator_1.ApiFile(),
    swagger_1.ApiResponse({ status: 201, description: 'Upload Product Image sucess' }),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "uploadFile", null);
__decorate([
    common_1.Post('removeImages'),
    common_1.UseGuards(new guards_1.RoleGuard(user_role_enum_1.UserRole.ADMIN)),
    swagger_1.ApiResponse({ status: 200, description: 'Get All products' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeProductImages", null);
ProductController = __decorate([
    common_2.Controller('api/products'),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map