import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/product.repository';
import { ProductImageRepository } from './repositories/productimage.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, ProductImageRepository]),
    MulterModule.register({
      storage: diskStorage({
        destination: 'public/media',
        filename: function (req:any, file, cb) {
          cb(null, Date.now() + '-' + file.originalname.replace(' ', '-'))
        }
      })
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
