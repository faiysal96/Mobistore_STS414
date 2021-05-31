import { Get, Post, Delete, UseGuards, UseInterceptors, UploadedFiles, Body, ValidationPipe, UsePipes, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators';
import { ApiFile } from 'src/common/decorators/file-upload-swagger.decorator';
import { RoleGuard } from 'src/common/guards';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserRole } from '../user/user-role.enum';
import { UserEntity } from '../user/user.entity';
import { CreatedProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';


@Controller('api/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get('getAll')
    @ApiResponse({ status: 200, description: 'Get All products' })
    async getPosts(@Query() query: any) {
        return await this.productService.getAll(query.query)
    }

    @Get('getById/:productId')
    @ApiResponse({ status: 200, description: 'Get All products' })
    async getById(@Param('productId', ParseIntPipe) productId: number): Promise<CreatedProductDto> {
        return await this.productService.getById(productId);
    }

    @Get('getSellerProducts')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 200, description: 'Get Seller Products' })
    async getSellerProducts(@AuthUser() user: UserEntity): Promise<CreatedProductDto[]> {
        return await this.productService.getSellerProducts(user.id);
    }

    @Post('add')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 200, description: 'Get All Products' })
    @ApiResponse({ status: 403, description: 'Role is limited to ADMIN and MANGER' })
    async addProduct(@Body() productInfo: ProductDto, @AuthUser() user: UserEntity): Promise<any> {
        return await this.productService.addProduct(productInfo, user.id)
    }

    @Post('update/:productId')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 200, description: 'Get All Products' })
    @UseInterceptors(FileInterceptor('file'))
    async updateProduct(@Body() productDto: UpdateProductDto, @Param('productId', ParseIntPipe) id: number): Promise<any> {
        return this.productService.updateProduct(productDto, id)

    }

    @Post('updateProductImages/:productId')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 200, description: 'Get All Products' })
    @UseInterceptors(FileInterceptor('file'))
    async updateProductImages(@Body() filePaths: string[], @Param('productId', ParseIntPipe) id: number): Promise<any> {
        return this.productService.updateProductImages(filePaths, id)

    }

    @Delete('delete/:productId')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 204, description: 'Deleted product' })
    @UseInterceptors(FileInterceptor('file'))
    async deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
        return await this.productService.deleteProduct(productId);
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiFile()
    @ApiResponse({ status: 201, description: 'Upload Product Image sucess' })
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        return files.map(file => file.filename)
    }

    @Post('removeImages')
    @UseGuards(new RoleGuard(UserRole.MANAGER))
    @ApiResponse({ status: 200, description: 'Get All products' })
    @UseInterceptors(FileInterceptor('file'))
    async removeProductImages(@Body() fileList: string[]): Promise<{ success: Boolean }> {
        await this.productService.removeImageFromProduct(fileList)
        return {
            success: true
        }
    }


}
