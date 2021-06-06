export declare class UpdateProductDto {
    readonly name: string;
    readonly type: string;
    readonly prize: number;
    readonly description: string;
    readonly stock: number;
}
export declare class ProductDto extends UpdateProductDto {
    readonly images: Array<any>;
}
export declare class CreatedProductDto extends ProductDto {
    readonly id: number;
}
