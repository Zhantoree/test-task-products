import Image from "next/image";
import React, {ChangeEvent, FC, memo} from "react";
import {Product} from "@/models/product";

interface CardProps {
    product: Product,
    amount: number,
    addToCart: (id: number) => void,
    removeFromCart: (id: number) => void
    changeAmount: (id: number, amount: number) => void
}

export const Card: FC<CardProps> = memo(({product, amount, addToCart, removeFromCart, changeAmount}) => {
    const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        changeAmount(product?.id, Number(e.target.value))
    }
    return <div key={product?.id} className="flex flex-col justify-start items-center p-2 bg-grey-300 rounded-xl">
        <Image width={400} height={300} src={product.image_url} alt={product.title}
               className=""
        />
        <h3 className="text-4xl mb-2">{product.title}</h3>
        <p className="text-2xl">{product.description}</p>
        <p className="text-4xl mt-auto mb-2">Цена: {product.price}₽</p>
        {
            product?.id && (
                amount ? (
                    <div className="flex justify-center gap-1">
                        <button onClick={() => removeFromCart(product.id)}
                                className="w-[68] my-2 bg-grey-500 text-white py-3 rounded-xl">-
                        </button>
                        <input
                            className="w-full text-center my-2 max-w-[150] bg-grey-500 text-white py-3 rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            value={amount}
                            min={1}
                            onChange={onChangeAmount}
                        />
                        <button onClick={() => addToCart(product.id)}
                                className="w-[68] my-2 bg-grey-500 text-white py-3 rounded-xl">+
                        </button>
                    </div>
                ) : (
                    <button onClick={() => addToCart(product.id)}
                            className="w-full my-2 bg-grey-500 text-white py-3 rounded-xl">Купить</button>
                )
            )
        }
    </div>
})

Card.displayName = "Card"