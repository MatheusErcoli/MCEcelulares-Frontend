'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "./Pagination";
import { useGetProdutos } from "@/src/hooks/products/useGetProdutos";
import { ProdutoCard } from "@/src/components/ProdutoCard";

export const ProdutoPagination = () => {
    const { execute, produtos, totalPages, total, error } = useGetProdutos();
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();

    const postsPerPage = 20;
    const id_categoria = searchParams.get('id_categoria') ?? undefined;

    useEffect(() => {
        setCurrentPage(1);
    }, [id_categoria]);

    useEffect(() => {
        execute(currentPage, postsPerPage, id_categoria);
    }, [currentPage, id_categoria]);

    return (
        <div className="container mx-auto pt-20 pb-5 px-30">
            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse">
                    {error}
                </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {produtos.map((p) => (
                    <ProdutoCard key={p.id_produto} product={p} />
                ))}
            </div>

            <Pagination
                totalPosts={total}
                postPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}