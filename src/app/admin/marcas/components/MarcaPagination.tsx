'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMarcas } from '@/src/hooks/marca/useGetMarcas';
import { CategoriaDropdown } from '../../../../components/produtos/CategoriaDropdown';
import { Pagination } from '../../../../components/layout/Pagination';
import { MarcaCard } from './MarcaCard';
import { Icon } from '@/src/components/layout/Icon';
import { AtivoDropdown } from '../../components/AtivoDropdown';

const PAGE_SIZE = 20;

export const MarcaPagination = () => {
    const router = useRouter();
    const { execute, marcas, loading, error } = useGetMarcas();
    const [currentPage, setCurrentPage] = useState(1);
    const [idCategoria, setIdCategoria] = useState('');
    const [ativo, setAtivo] = useState('');

    const handleCategoriaChange = (value: string) => {
        setIdCategoria(value);
        setCurrentPage(1);
    };

    const handleAtivoChange = (value: string) => {
        setAtivo(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        execute(
            idCategoria ? Number(idCategoria) : undefined,
            ativo === '' ? undefined : ativo === 'true'
        );
    }, [idCategoria, ativo]);

    const totalPages = Math.ceil(marcas.length / PAGE_SIZE);
    const paginatedMarcas = marcas.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div className="container mx-auto pt-5 pb-5 px-10">
            <div className="flex justify-center items-center gap-10 mb-10">
                <CategoriaDropdown variant="white" value={idCategoria} onChange={handleCategoriaChange} />
                <AtivoDropdown value={ativo} onChange={handleAtivoChange} />

                <button
                    onClick={() => router.push('/admin/marcas/cadastro')}
                    className="
        appearance-none cursor-pointer
        bg-white hover:bg-gray-50
        text-gray-800 font-medium text-sm
        px-5 py-2.5
        rounded-full
        border border-gray-200 outline-none shadow-sm
        transition-colors duration-150
        disabled:cursor-not-allowed disabled:opacity-50
                    "
                >
                    Adicionar marca
                    <Icon name='faPlus' className='pl-2' />
                </button>
            </div>

            {loading && <p className="text-center font-medium text-gray-400 animate-pulse">Carregando marcas...</p>}
            {error && <p className="text-center font-medium text-red-600 animate-pulse">{error}</p>}
            {!loading && !error && paginatedMarcas.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                    <Icon name="faStar" />
                    <p className="text-sm font-medium">Nenhuma marca encontrada.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedMarcas.map((m) => (
                    <MarcaCard key={m.id_marca} marca={m} />
                ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};