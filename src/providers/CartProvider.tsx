'use client'

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

interface CartContextType {
    cart: {
        [key: string]: number
    }
    setCart: Dispatch<SetStateAction<{
        [key: string]: number
    }>>;
}


export const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<{[key: string]: number}>({})


    const contextValue: CartContextType = {
        cart, setCart
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart должен использоваться в CartProvider");
    return ctx;
};