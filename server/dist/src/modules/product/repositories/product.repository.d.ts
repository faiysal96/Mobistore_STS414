import { Repository } from "typeorm";
import { CreatedProductDto, ProductDto, UpdateProductDto } from "../dto/product.dto";
import { ProductEntity } from "../product.entity";
import { ProductImageRepository } from "./productimage.repository";
export declare class ProductRepository extends Repository<ProductEntity> {
    private productImageRepo;
    constructor(productImageRepo: ProductImageRepository);
    private logger;
    addProduct(product: ProductDto, userId: any): Promise<CreatedProductDto>;
    updateProduct(productDto: UpdateProductDto, id: number): Promise<ProductDto>;
}
