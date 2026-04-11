'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMarcas } from '@/src/hooks/marca/useGetMarcas';
import { CategoriaDropdown } from '../../../../components/produtos/CategoriaDropdown';
import { Pagination } from '../../../../components/layout/Pagination';
import { MarcaCard } from './MarcaCard';

const PAGE_SIZE = 20;

export const MarcaPagination = () => {
    const router = useRouter();
    const { execute, marcas, loading, error } = useGetMarcas();
    const [currentPage, setCurrentPage] = useState(1);
    const [idCategoria, setIdCategoria] = useState('');

    const handleCategoriaChange = (value: string) => {
        setIdCategoria(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        execute(idCategoria ? Number(idCategoria) : undefined);
    }, [idCategoria]);

    const totalPages = Math.ceil(marcas.length / PAGE_SIZE);
    const paginatedMarcas = marcas.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className="container mx-auto pt-5 pb-5 px-10">

            <div className="flex justify-center items-center gap-10 mb-10">
                <CategoriaDropdown value={idCategoria} onChange={handleCategoriaChange} />

                <button
                    onClick={() => router.push('/admin/marcas/cadastro')}
                    className="
                        flex items-center gap-2 cursor-pointer
                        bg-gray-100 hover:bg-gray-200
                        text-gray-800 font-medium text-sm
                        px-5 py-2.5
                        rounded-full
                        border-none outline-none
                        transition-colors duration-150
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Adicionar marca
                </button>
            </div>

            {loading && (
                <p className="text-center font-medium text-gray-400 animate-pulse">
                    Carregando marcas...
                </p>
            )}

            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse">
                    {error}
                </p>
            )}

            {!loading && !error && paginatedMarcas.length === 0 && (
                <p className="text-center font-medium text-gray-400">
                    Nenhuma marca encontrada.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedMarcas.map((m) => (
                    <MarcaCard key={m.id_marca} marca={m} />
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