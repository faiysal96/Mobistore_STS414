import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsArray,
    IsEmpty,
  } from 'class-validator';

  export class UpdateCartItemDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly quantity:number;
}

export class CartItemDto extends UpdateCartItemDto{

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly product:number;
    
}