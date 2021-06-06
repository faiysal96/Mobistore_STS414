/// <reference types="multer" />
import { UserEntity } from '../user/user.entity';
import { CreatedProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getPosts(query: any): Promise<any[]>;
    getById(productId: number): Promise<CreatedProductDto>;
    getSellerProducts(user: UserEntity): Promise<CreatedProductDto[]>;
    addProduct(productInfo: ProductDto, user: UserEntity): Promise<any>;
    updateProduct(productDto: UpdateProductDto, id: number): Promise<any>;
    updateProductImages(filePaths: string[], id: number): Promise<any>;
    deleteProduct(productId: number): Promise<any>;
    uploadFile(files: Array<Express.Multer.File>): string[];
    removeProductImages(fileList: string[]): Promise<{
        success: Boolean;
    }>;
}
