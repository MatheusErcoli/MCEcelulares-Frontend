'use client';

import { useEffect } from "react";
import { ProdutoCarousel } from "../../components/ProdutoCarousel";
import { useGetProdutos } from "@/src/hooks/products/useGetProdutos";

type ProdutoDestaqueProps = {
    title: string;
}

export const ProdutoDestaque = ({ title }: ProdutoDestaqueProps) => {
    const { execute, produtos, error } = useGetProdutos();

    useEffect(() => {
        execute(undefined, undefined, undefined, undefined, true);
    }, []);

    if (error) return null;
    if (produtos.length === 0) return null;

    return (
        <>
            <h2 className="font-bold font text-4xl m-[20px] pl-40">{title}</h2>
            <ProdutoCarousel produtos={produtos} />
        </>
    );
};