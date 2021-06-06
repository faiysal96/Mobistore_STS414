import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsArray,
    IsEmpty,
    IsOptional,
} from 'class-validator';
export class SupportDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    readonly status: string;
}

export class UpdateSupportDto {
    @ApiProperty()
    @IsArray()
    @IsOptional()
    readonly conversation: any[]
}

export class StatusSupportDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly status: string;
}

