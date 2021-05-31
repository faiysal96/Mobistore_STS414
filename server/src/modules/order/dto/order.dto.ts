import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsArray,
    IsEmpty,
    IsOptional,
} from 'class-validator';

export class UpdateOrderDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly status: string;
}

export class OrderItemDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly product: number;
}

export class OrderDto extends UpdateOrderDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly order_to_name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly phone: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly paymentMethod: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly notes: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly prize: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    readonly orderItems: OrderItemDto[];

}

