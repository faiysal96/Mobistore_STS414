export declare class UpdateOrderDto {
    readonly status: string;
}
export declare class OrderItemDto {
    readonly quantity: number;
    readonly product: number;
}
export declare class OrderDto extends UpdateOrderDto {
    readonly order_to_name: string;
    readonly phone: number;
    readonly paymentMethod: string;
    readonly address: string;
    readonly notes: string;
    readonly prize: number;
    readonly userId: number;
    readonly orderItems: OrderItemDto[];
}
