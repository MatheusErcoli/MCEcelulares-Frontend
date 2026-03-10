'use client'

import { ProductCard } from "@/src/components/common/ProdutoCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ProductCarouselProps = {
    products: ProductType[];
}
type ProductType = {
    id: string | number
    name: string;
    price: number;
    image: string;
}

export const ProductsCarousel = ({products}: ProductCarouselProps) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
    };

    return (
        <div className="w-full max-w-7xl m-auto px-12">
            <div className="m-0 p-0">
                <Slider {...settings}>
                {products.map((p) => (
                    <ProductCard key={p.id || p.name} name={p.name} image={p.image} price={p.price} />
                ))}
                </Slider>
            </div>
        </div>
    );
};
