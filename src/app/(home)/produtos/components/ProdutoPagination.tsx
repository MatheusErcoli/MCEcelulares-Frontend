'use client';

import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { useGetProdutos } from "@/src/hooks/produto/useGetProdutos";
import { ProdutoCard } from "@/src/components/ProdutoCard";
import { CategoriaDropdown } from "./CategoriaDropdown";
import { MarcaDropdown } from "./MarcaDropdown";

export const ProdutoPagination = () => {
    const { execute, produtos, totalPages, error } = useGetProdutos();
    const [currentPage, setCurrentPage] = useState(1);
    const [idCategoria, setIdCategoria] = useState('');
    const [idMarca, setIdMarca] = useState('');

    const handleCategoriaChange = (value: string) => {
        setIdCategoria(value);
        setIdMarca('');
        setCurrentPage(1);
    };

    const handleMarcaChange = (value: string) => {
        setIdMarca(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        execute(currentPage, 20, idCategoria || undefined, idMarca || undefined);
    }, [currentPage, idCategoria, idMarca]);

    return (
        <div className="container mx-auto pt-15 pb-5 px-30">

            <div className="flex justify-center items-center gap-10 mb-10">
                <CategoriaDropdown value={idCategoria} onChange={handleCategoriaChange} />
                <MarcaDropdown value={idMarca} onChange={handleMarcaChange} id_categoria={idCategoria} />
            </div>

            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {produtos.map((p) => (
                    <ProdutoCard key={p.id_produto} produto={p} />
                ))}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};