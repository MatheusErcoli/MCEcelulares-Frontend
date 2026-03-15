import { ProductCard } from "@/src/components/common/ProductCard";
import { Button } from "@/src/components/ui/Button";
import { ProductsCarousel } from "./components/ProductsCarousel";
import { CategoryList } from "./components/CategoryList";

const products = [
    {
        id: 1,
        name: "Câmera Vintage",
        price: 299.9,
        image: "https://picsum.photos/id/250/300/200",
    },
    {
        id: 2,
        name: "Relógio Elegance",
        price: 150.0,
        image: "https://picsum.photos/id/357/300/200",
    },
    {
        id: 3,
        name: "Fone Bluetooth",
        price: 89.5,
        image: "https://picsum.photos/id/445/300/200",
    },
    {
        id: 4,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id: 5,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id: 6,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id: 7,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id: 8,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id: 9,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id: 10,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
];

const Home = () => {
    return (
        <>
            <CategoryList />
            <h2 className="font-bold font text-4xl m-[20px] pl-40">Em destaque</h2>
            <ProductsCarousel products={products} />
            <h2 className="font-bold font text-4xl m-[20px] pl-40">Mais vendidos</h2>
            <ProductsCarousel products={products} />
        </>
    );
}

export default Home;