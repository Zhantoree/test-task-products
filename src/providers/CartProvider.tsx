'use client';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react';
import { CartItem } from '@/models/product';

interface CartContextType {
    cart: CartItem[];
    phone: string;
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    setPhone: Dispatch<SetStateAction<string>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [phone, setPhone] = useState<string>(() => {
        try {
            const stored = localStorage.getItem('phone');
            return stored ? `${JSON.parse(stored)}` : '';
        } catch {
            return '';
        }
    });


    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (e) {
            console.log(e)
        }
    }, [cart]);

    useEffect(() => {
        try {
            localStorage.setItem('phone', JSON.stringify(phone));
        } catch (e) {
            console.log(e)
        }
    }, [phone]);

    return (
        <CartContext.Provider value={{ cart, setCart, phone, setPhone }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
};
