'use server'

import {getProducts} from "@/api/productAPI";
import {GetProductsResponse} from "@/models/product";

export async function fetchProducts({page = 1}: {page: number}): Promise<GetProductsResponse> {
    return await getProducts({size: 20, page})
}