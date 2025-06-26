import {fetchProducts} from "@/action/actions";


const ProductList = () => {
  const products = await fetchProducts({page: 1})
}