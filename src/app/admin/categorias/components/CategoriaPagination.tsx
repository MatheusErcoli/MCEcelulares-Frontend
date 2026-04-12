'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCategorias } from '@/src/hooks/categoria/useGetCategorias';
import { CategoriaCard } from './CategoriaCard';
import { Pagination } from '@/src/components/layout/Pagination';
import { Icon } from '@/src/components/layout/Icon';
import { AtivoDropdown } from '../../components/AtivoDropdown';

const PAGE_SIZE = 20;

export const CategoriaPagination = () => {
    const router = useRouter();
    const { execute, categorias, loading, error } = useGetCategorias();
    const [currentPage, setCurrentPage] = useState(1);
    const [ativo, setAtivo] = useState('');

    const handleAtivoChange = (value: string) => {
        setAtivo(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        execute(ativo === '' ? undefined : ativo === 'true');
    }, [ativo]);

    const totalPages = Math.ceil(categorias.length / PAGE_SIZE);
    const paginatedCategorias = categorias.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div className="container mx-auto pt-5 pb-5 px-10">
            <div className="flex justify-center items-center gap-10 mb-10">
                <AtivoDropdown value={ativo} onChange={handleAtivoChange} />

                <button
                    onClick={() => router.push('/admin/categorias/cadastro')}
                    className="
                        flex items-center gap-2 cursor-pointer
                        bg-white hover:bg-gray-50
                        text-gray-800 font-medium text-sm
                        px-5 py-2.5
                        rounded-full
                        border-none outline-none shadow-sm
                        transition-colors duration-150
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Adicionar categoria
                </button>
            </div>

            {loading && <p className="text-center font-medium text-gray-400 animate-pulse">Carregando categorias...</p>}
            {error && <p className="text-center font-medium text-red-600 animate-pulse">{error}</p>}
            {!loading && !error && paginatedCategorias.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                    <Icon name="faTag" />
                    <p className="text-sm font-medium">Nenhuma categoria encontrada.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedCategorias.map((c) => (
                    <CategoriaCard key={c.id_categoria} categoria={c} />
                ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};