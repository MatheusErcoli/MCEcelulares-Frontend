'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Pagination } from "../../../../components/layout/Pagination";
import { useGetProdutos } from "@/src/hooks/produto/useGetProdutos";
import { CategoriaDropdown } from "../../../../components/produtos/CategoriaDropdown";
import { MarcaDropdown } from "../../../../components/produtos/MarcaDropdown";
import { ProdutoCardAdm } from "./ProdutoCardAdm";
import { Icon } from "@/src/components/layout/Icon";
import { AtivoDropdown } from "../../components/AtivoDropdown";

export const ProdutoPaginationAdm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { execute, produtos, totalPages, loading, error } = useGetProdutos();
    const [currentPage, setCurrentPage] = useState(1);
    const [idCategoria, setIdCategoria] = useState(searchParams.get('id_categoria') ?? '');
    const [idMarca, setIdMarca] = useState('');
    const [ativo, setAtivo] = useState('');

    const handleCategoriaChange = (value: string) => {
        setIdCategoria(value);
        setIdMarca('');
        setCurrentPage(1);
    };

    const handleMarcaChange = (value: string) => {
        setIdMarca(value);
        setCurrentPage(1);
    };

    const handleAtivoChange = (value: string) => {
        setAtivo(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        execute(
            currentPage, 20,
            idCategoria || undefined,
            idMarca || undefined,
            undefined,
            ativo === '' ? undefined : ativo === 'true'
        );
    }, [currentPage, idCategoria, idMarca, ativo]);

    return (
        <div className="container mx-auto pt-5 pb-5 px-10">
            <div className="flex justify-center items-center gap-10 mb-10">
                <CategoriaDropdown variant="white" value={idCategoria} onChange={handleCategoriaChange} />
                <MarcaDropdown variant="white" value={idMarca} onChange={handleMarcaChange} id_categoria={idCategoria} />
                <AtivoDropdown value={ativo} onChange={handleAtivoChange} />

                <button
                    onClick={() => router.push('/admin/produtos/cadastro')}
                    className="
        flex items-center gap-2 cursor-pointer
        bg-white hover:bg-gray-50
        text-gray-800 font-medium text-sm
        px-5 py-2.5
        rounded-full
        border border-gray-200 outline-none shadow-sm
        transition-colors duration-150
    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Adicionar produto
                </button>
            </div>

            {loading && <p className="text-center font-medium text-gray-400 animate-pulse">Carregando produtos...</p>}
            {error && <p className="text-center font-medium text-red-600 animate-pulse">{error}</p>}
            {!loading && !error && produtos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                    <Icon name="faMobileScreen" />
                    <p className="text-sm font-medium">Nenhum produto encontrado.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {produtos.map((p) => (
                    <ProdutoCardAdm key={p.id_produto} produto={p} />
                ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};