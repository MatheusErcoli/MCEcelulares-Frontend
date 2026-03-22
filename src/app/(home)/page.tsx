import { ProductsCarousel } from "./components/ProductsCarousel";
import { CategoryList } from "./components/CategoryList";
import { getProductsAction } from "@/src/actions/products";

export default async function Home() {
    const products = await getProductsAction();

    return (
        <>
            <CategoryList />
            
            <h2 className="font-bold font text-4xl m-[20px] pl-40">Em destaque</h2>
            
            {products.length > 0 ? (
                <ProductsCarousel products={products} />
            ) : (
                <p className="pl-40 text-gray-500 mb-10">Nenhum produto disponível no momento.</p>
            )}

            <h2 className="font-bold font text-4xl m-[20px] pl-40">Mais vendidos</h2>
            
            {products.length > 0 ? (
                <ProductsCarousel products={products} />
            ) : (
                <p className="pl-40 text-gray-500 mb-10">Nenhum produto disponível no momento.</p>
            )}
        </>
    );
}