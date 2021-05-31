import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsEmpty,
} from 'class-validator';
export class UpdateProductDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly prize: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

}

export class ProductDto extends UpdateProductDto {

  @ApiProperty()
  @IsArray()
  readonly images: Array<any>;

}

export class CreatedProductDto extends ProductDto {

  @ApiProperty()
  @IsNumber()
  readonly id: number;

}