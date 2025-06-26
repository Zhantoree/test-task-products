'use client'

import {createContext, useContext, useState} from "react";

export const CartContext = createContext([])

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    return (
        <CartContext.Provider> </CartContext.Provider>
    )
}
