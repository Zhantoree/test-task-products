export interface GetProductsResponse {
    page: number,
    amount: number,
    total: number,
    items: Product[]
}

export interface GetProductsParams {
    page: number,
    size: number
}

export interface Product {
    id: number,
    image_url: string,
    title: string,
    description: string,
    price: number,
}

export type CartItem = Product & { amount: number };