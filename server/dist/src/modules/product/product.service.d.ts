import { CreatedProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductRepository } from './repositories/product.repository';
import { ProductImageRepository } from './repositories/productimage.repository';
export declare class ProductService {
    private readonly productRepository;
    private readonly productImageRepo;
    constructor(productRepository: ProductRepository, productImageRepo: ProductImageRepository);
    getAll(query: string): Promise<any[]>;
    getById(id: number): Promise<any>;
    getSellerProducts(userId: number): Promise<any[]>;
    addProduct(product: ProductDto, userId: number): Promise<CreatedProductDto>;
    updateProduct(product: UpdateProductDto, id: number): Promise<any>;
    deleteProduct(id: number): Promise<any>;
    removeImages(images: any): any;
    addImage(image: File): any;
    updateProductImages(paths: any, id: any): Promise<{
        sucess: boolean;
    }>;
    removeImageFromProduct(paths: string[]): Promise<import("typeorm").DeleteResult>;
}
