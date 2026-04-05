'use client'

import { ProdutoCard } from "@/src/components/ProdutoCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ProdutoCarouselProps = {
    produtos: ProdutoType[];
}

export const ProdutoCarousel = ({ produtos }: ProdutoCarouselProps) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    return (
        <div className="w-full max-w-7xl m-auto px-12 pb-15">
            <div className="m-0 p-0">
                <Slider {...settings}>
                    {produtos.map((p) => (
                        <ProdutoCard key={p.id_produto} produto={p} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};
