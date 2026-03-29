import { ProductsCarousel } from "./components/ProductsCarousel";
import { CategoryList } from "./components/CategoryList";
import { getFeaturedProducts } from "@/src/actions/products";

export default async function Home() {

    let featuredProducts: ProductType[] = []
    const data = await getFeaturedProducts();

    if (data.featuredProducts) {
        featuredProducts = data.featuredProducts
    }

    return (
        <>
            <CategoryList />

            {featuredProducts.length > 0 && (
                <>
                    <h2 className="font-bold font text-4xl m-[20px] pl-40">Destaques</h2>
                    <ProductsCarousel products={featuredProducts} />
                </>
            )}


            {featuredProducts.length > 0 && (
                <>
                    <h2 className="font-bold font text-4xl m-[20px] pl-40">Mais pedidos</h2>
                    <ProductsCarousel products={featuredProducts} />
                </>
            )}
        </>
    );
}