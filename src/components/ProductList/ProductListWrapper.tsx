import {fetchProducts} from "@/action/actions";
import {ProductList} from "@/components/ProductList/index";
import {CartProvider} from "@/providers/CartProvider";

export async function ProductListWrapper () {
    const productsData = await fetchProducts({page: 1})

    return <CartProvider>
        <ProductList productsData={productsData} />
    </CartProvider>
}