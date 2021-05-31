import { EntityRepository, getRepository, Repository } from "typeorm";
import { ProductImageEntity } from "../productimage.entity";


@EntityRepository(ProductImageEntity)
export class ProductImageRepository extends Repository<ProductImageEntity> {

    public async addImages(images: Array<any>, productId: any) {
        images.forEach(async (image) => {
            let imageEntity = new ProductImageEntity();
            imageEntity.path = image;
            imageEntity.product = productId
            await this.save(imageEntity)
        })
    }
}