import {CreateOrderRequest, CreateOrderResponse} from "@/models/order";
import axios from "axios";


export const createOrder = async (body: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
        const res = await axios.post('http://o-complex.com:1337/order', body)
        return res.data
    } catch (e) {
        console.error(e)
        throw new Error('Ошибка при создании заказа')
    }
}