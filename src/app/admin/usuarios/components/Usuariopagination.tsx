'use client';

import { useState, useEffect } from 'react';
import { useGetUsuarios } from '@/src/hooks/usuario/useGetUsuarios';
import { Pagination } from '@/src/components/layout/Pagination';
import { UsuarioCard } from './UsuarioCard';

const PAGE_SIZE = 20;

export const UsuarioPagination = () => {
    const { execute, usuarios, loading, error, totalPages } = useGetUsuarios();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        execute(currentPage, PAGE_SIZE);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto pt-5 pb-5 px-10">

            <div className="flex justify-center items-center mb-10">
                <h2 className="text-gray-600 font-medium text-sm">
                    Gerenciar usuários cadastrados
                </h2>
            </div>

            {loading && (
                <p className="text-center font-medium text-gray-400 animate-pulse">
                    Carregando usuários...
                </p>
            )}

            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse">
                    {error}
                </p>
            )}

            {!loading && !error && usuarios.length === 0 && (
                <p className="text-center font-medium text-gray-400">
                    Nenhum usuário encontrado.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {usuarios.map((u) => (
                    <UsuarioCard key={u.id_usuario} usuario={u} />
                ))}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
            />
        </div>
    );
};