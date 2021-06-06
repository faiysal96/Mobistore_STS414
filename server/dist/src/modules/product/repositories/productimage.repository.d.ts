import { Repository } from "typeorm";
import { ProductImageEntity } from "../productimage.entity";
export declare class ProductImageRepository extends Repository<ProductImageEntity> {
    addImages(images: Array<any>, productId: any): Promise<void>;
}
