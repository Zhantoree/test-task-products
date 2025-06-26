import {axiosClient} from "@/api/axiosClient";
import {GetProductsParams, GetProductsResponse} from "@/models/product";

export const getProducts = async ({size, page}: GetProductsParams): Promise<GetProductsResponse> => {
    try {
        const {data} = await axiosClient.get(`http://o-complex.com:1337/products?page=${page}&page_size=${size}`)
        return data
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка подгрузки отзывов')
    }
}

