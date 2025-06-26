'use client'

import {GetProductsResponse, Product} from "@/models/product"
import {FC, useCallback, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {fetchProducts} from "@/action/actions";
import {useCart} from "@/providers/CartProvider";
import {Card} from "@/components/ProductList/Card";
import MaskedPhoneInput from "@/components/MaskedPhoneInput";
import {Modal} from "@/components/Modal/Modal";
import {createOrder} from "@/api/orderAPI";

interface ProductListProps {
    productsData: GetProductsResponse
}

export const ProductList: FC<ProductListProps> = ({productsData}) => {
    const [ref, inView] = useInView()
    const {cart, setCart, phone, setPhone} = useCart()

    const [products, setProducts] = useState<Product[]>(productsData?.items)
    const [page, setPage] = useState<number>(1)
    const [isModalOpen, setModalOpen] = useState(false);
    const [success, setSuccess] = useState(false)

    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    const onPhoneChange = (value: string) => {
        setPhone(value)
        if (typeof window !== 'undefined') {
            localStorage.setItem('phone', value)
        }
    }

    const loadMoreProducts = useCallback(async (page: number) => {
        const nextPage = page + 1;
        const products = (await fetchProducts({page: nextPage})).items
        if (products?.length) {
            setPage(nextPage)
            setProducts(prev => ([
                ...(prev?.length ? prev : []), ...products
            ]))
        }
    }, [])

    const addToCart = useCallback((id: number) => {
        setCart((prev) => {
            const existedProduct = prev?.find(el => el.id === id)
            const productToAdd = products.find(el => el.id === id)

            if (!productToAdd) {
                return prev
            }

            if (existedProduct?.amount) {
                return [
                    ...prev.filter(el => el.id !== id),
                    {
                        ...existedProduct,
                        amount: existedProduct.amount + 1
                    }
                ]
            } else {
                return [
                    ...prev,
                    {
                        ...productToAdd,
                        amount: 1
                    }
                ]
            }
        });
    }, [products, setCart])

    const removeFromCart = useCallback((id: number) => {
        setCart(prev => {
            const existedProduct = prev?.find(el => el?.id === id)

            if (existedProduct?.amount && existedProduct?.amount > 1) {
                return [...prev.filter(el => el?.id !== id), {...existedProduct, amount: existedProduct?.amount - 1}]
            } else {
                return prev.filter(el => el?.id !== id)
            }
        });
    }, [setCart])

    const changeAmount = useCallback((id: number, amount: number) => {
        setCart(prev => {
            const existedProduct = prev?.find(el => el.id === id)
            if (!existedProduct) {
                return prev
            }
            if (!amount || amount < 1) {
                return [...prev.filter(el => el.id !== id)]
            }

            return [...prev.filter(el => el.id !== id), {...existedProduct, amount: amount}]
        })
    }, [setCart])

    const orderProducts = async () => {
        try {
            const res = await createOrder({
                cart: cart?.map(p => ({
                    id: p?.id,
                    quantity: p?.amount
                })),
                phone: phone
            })
            if(res?.success) {
                setSuccess(true)
                setModalOpen(true)
                setCart([])
                setPhone('')
            } else {
                setSuccess(false)
                setModalOpen(true)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (inView) {
            loadMoreProducts(page).then()
        }
    }, [inView, loadMoreProducts, page]);

    const isPhoneFull = phone?.trim()?.length > 10

    const onCloseModal = ()=> {
        setSuccess(false)
        setModalOpen(false)
    }

    if (!isHydrated) {
        return (
            <section className="w-full px-4">
                <div className="max-w-[708] mx-auto p-3 rounded-xl mb-10 bg-grey-300">
                    <p className="text-4xl text-center pb-3">Добавленные товары</p>
                    <div className="flex justify-between flex-col sm:flex-row">
                        <div className="border rounded-xl p-2 w-full mr-4 bg-grey-500 text-white text-4xl">
                            {/* Placeholder for phone input */}
                        </div>
                        <button
                            disabled
                            className="cursor-not-allowed py-2 px-14 bg-grey-400 text-white rounded-xl"
                        >
                            заказать
                        </button>
                    </div>
                </div>

                <div className="max-w-[983] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
                    {products?.map(product => (
                        <Card key={product?.id} product={product}
                              amount={0}
                              addToCart={addToCart} removeFromCart={removeFromCart} changeAmount={changeAmount}/>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="w-full px-4">
            <div className="max-w-[708] mx-auto p-3 rounded-xl mb-10 bg-grey-300">
                <p className="text-4xl text-center pb-3">Добавленные товары</p>
                {cart?.map(product => <div key={product?.id} className="flex justify-between">
                    <p className="truncate text-ellipsis w-100">{product?.title}</p>
                    <p>x{product?.amount}</p>
                    {product?.amount && <p>{product?.amount * Number(product?.price)}₽</p>}
                </div>)}
                <div className="flex justify-between flex-col sm:flex-row">
                    <MaskedPhoneInput
                        value={phone}
                        onChange={(digits) => onPhoneChange(digits)}
                    />
                    {
                        isPhoneFull ? (
                            <button onClick={orderProducts}
                                    className="cursor-pointer py-2 px-14 bg-grey-500 text-white rounded-xl">заказать
                            </button>
                        ) : (
                            <button onClick={orderProducts}
                                    disabled
                                    className="cursor-not-allowed py-2 px-14 bg-grey-400 text-white rounded-xl">заказать
                            </button>
                        )
                    }
                </div>
            </div>

            <div className="max-w-[983] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10">
                {products?.map(product => (
                    <Card key={product?.id} product={product}
                          amount={cart?.find(el => el.id === product?.id)?.amount || 0}
                          addToCart={addToCart} removeFromCart={removeFromCart} changeAmount={changeAmount}/>
                ))}
            </div>
            {
                isModalOpen && (
                    success ? (
                        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                            <h2 className="text-2xl font-semibold mb-4">Успех!</h2>
                            <p>Заказ успешно создан</p>
                        </Modal>
                    ) : (
                        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
                            <h2 className="text-2xl font-semibold mb-4">Ошибка</h2>
                            <p>Не удалось создать заказ</p>
                        </Modal>
                    )
                )
            }
            <div
                ref={ref}
                className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'
            >
                <svg
                    aria-hidden='true'
                    className='h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                    />
                    <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                    />
                </svg>
                <span className='sr-only'>Loading...</span>
            </div>
        </section>
    )
}
