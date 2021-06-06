import { AbstractEntity } from 'src/common/abstract.entity';
import { ProductEntity } from './product.entity';
export declare class ProductImageEntity extends AbstractEntity {
    path: string;
    product: ProductEntity;
}
