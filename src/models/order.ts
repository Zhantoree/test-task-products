export interface CreateOrderRequest {
    phone: string,
    cart:  {
        id: number,
        quantity: number,
    }[]
}

export interface CreateOrderResponse {
    success: 0 | 1,
    error?: string
}