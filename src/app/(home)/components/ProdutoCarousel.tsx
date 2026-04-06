'use client'

import { ProdutoCard } from "@/src/components/ProdutoCard";
import Slider from "react-slick";
// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
import "slick-carousel/slick/slick-theme.css";
import { useGetProdutos } from "@/src/hooks/produto/useGetProdutos";
import { useEffect } from "react";

type ProdutoCarouselProps = {
    destaque?: boolean
}

export const ProdutoCarousel = ({destaque}: ProdutoCarouselProps) => {
    const { execute, produtos, error } = useGetProdutos();

    useEffect(() => {
        execute(undefined, undefined, undefined, undefined, destaque);
    }, []);

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
