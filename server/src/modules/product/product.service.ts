import { NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreatedProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductRepository } from './repositories/product.repository';
import { ProductImageRepository } from './repositories/productimage.repository';

import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan } from 'typeorm';
import { ProductImageEntity } from './productimage.entity';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductRepository) private readonly productRepository: ProductRepository,
        @InjectRepository(ProductImageRepository) private readonly productImageRepo: ProductImageRepository) {
    }

    /**
     *  getAll Products for Uses to see
     */
    async getAll(query: string): Promise<CreatedProductDto[]> {
        if (!query) {
            return await this.productRepository.find({ where: { stock: MoreThan(0) }, relations: ['images'] })
        }
        return await this.productRepository.find({ where: { name: Like(`%${query}%`), stock: MoreThan(0) }, relations: ['images'] })
    }

    async getById(id: number): Promise<CreatedProductDto> {
        return await this.productRepository.findOne({ relations: ['images'], where: { id } })
    }

    async getSellerProducts(userId: number): Promise<CreatedProductDto[]> {
        return await this.productRepository.find({ relations: ['images'], where: { user: userId } })
    }

    async addProduct(product: ProductDto, userId: number): Promise<CreatedProductDto> {
        const productEntity = await this.productRepository.addProduct(product, userId);
        await this.productImageRepo.addImages(product.images, productEntity.id);
        return productEntity;
    }

    async updateProduct(product: UpdateProductDto, id: number): Promise<ProductDto> {
        return await this.productRepository.updateProduct(product, id);
    }

    async deleteProduct(id: number): Promise<any> {
        const result = await this.productRepository.delete(id);
        const imageIds: Array<number> = (await this.productImageRepo.find({ where: { product: id } })).map((productImage: any) => productImage.id);
        let images = await this.productImageRepo.delete(imageIds);
        this.removeImages(images);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
        return Promise.resolve({
            result: result,
            status: 'success'
        });
    }

    removeImages(images: any): any {
        // DELETE IMAGES FROM FS OR CLOUD STORAGE
        try {
            images.forEach((element: any) => {
                fs.unlinkSync(element.path);
            });
        } catch (error) {
            console.error(error);

        }

    }

    addImage(image: File): any {
        const path = process.env.MEDIA_PATH ?? 'media';
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
            // fs.appendFileSync( image)
        }
        return { success: true }
    }

    async updateProductImages(paths, id: any) {
        paths.forEach(async (path) => {
            let image = new ProductImageEntity()
            image.product = id;
            image.path = path;
            this.productImageRepo.save(image)
        })
        return {
            sucess: true
        }
        // let images = await this.productRepository.findOne(id);

    }

    async removeImageFromProduct(paths: string[]) {
        let images = await this.productImageRepo.createQueryBuilder()
            .where(`path IN (:paths)`, { paths })
            .getMany();
        return await this.productImageRepo.delete(images.map(i => i.id))
    }
}
