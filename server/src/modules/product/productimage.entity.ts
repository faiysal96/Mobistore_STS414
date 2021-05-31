
import { AbstractEntity } from 'src/common/abstract.entity';
import { Entity, Column, Unique, OneToMany, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';




@Entity({ name: 'product_image' })
export class ProductImageEntity extends AbstractEntity {

  @Column({nullable: false})
  path: string;

  @ManyToOne(() => ProductEntity, product => product.images)
  @JoinColumn()
  product: ProductEntity;

}