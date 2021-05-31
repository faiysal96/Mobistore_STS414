import { NotFoundException } from "@nestjs/common";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { EntityRepository, Repository } from "typeorm";
import { CreatedProductDto, ProductDto, UpdateProductDto } from "../dto/product.dto";
import { ProductEntity } from "../product.entity";
import { ProductImageRepository } from "./productimage.repository";


@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {

    constructor(@InjectRepository(ProductImageRepository) private productImageRepo: ProductImageRepository) {
        super();
    }
    private logger = new Logger('ProductRepository');

    async addProduct(product: ProductDto, userId): Promise<CreatedProductDto> {
        const { name, description, prize, stock } = product;

        const productEntity = new ProductEntity();
        productEntity.name = name;
        productEntity.description = description
        productEntity.prize = prize
        productEntity.stock = stock
        productEntity.user = userId


        try {
            const createProduct = await this.save(productEntity)
            // await this.productImageRepo.addImages(images, createProduct.id);
            return plainToClass(CreatedProductDto, createProduct);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async updateProduct(productDto: UpdateProductDto, id: number): Promise<ProductDto> {

        let product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }

        try {
            this.merge(product, productDto);
            const updateProduct = await this.save(product)
            return plainToClass(ProductDto, updateProduct);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException();
        }
    }

}