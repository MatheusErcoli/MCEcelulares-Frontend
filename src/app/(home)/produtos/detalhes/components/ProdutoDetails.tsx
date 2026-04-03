'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetProduto } from '@/src/hooks/produto/useGetProduto';
import { useCreateItemCarrinho } from '@/src/hooks/carrinho/useCreateItemCarrinho';
import { Button } from '@/src/components/Button';

export const ProdutoDetails = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = Number(searchParams.get('id'));

    const { execute: buscarProduto, produto, isLoading, error } = useGetProduto();
    const { execute: adicionarAoCarrinho, isLoading: adicionando } = useCreateItemCarrinho();

    useEffect(() => {
        if (id) buscarProduto(id);
    }, [id]);

    const handleAdd = async () => {
        const id_usuario = Number(localStorage.getItem('id_usuario'));
        const token = localStorage.getItem('auth_token');

        if (!id_usuario || !token) {
            alert('Você precisa estar logado para adicionar itens ao carrinho.');
            return;
        }

        const res = await adicionarAoCarrinho(id_usuario, produto!.id_produto, produto!.preco, token);

        if (res.success) {
            router.push('/carrinho');
        } else {
            alert('Erro ao adicionar item ao carrinho.');
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500 text-xl animate-pulse">Carregando...</p>
        </div>
    );

    if (error || !produto) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-500 text-xl">Produto não encontrado.</p>
        </div>
    );

    return (
        <div className="flex h-[calc(100vh-80px)]">
            <div className="w-1/2 bg-[#E5E7EB] flex items-center justify-center p-12">
                <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="object-contain max-h-full max-w-full"
                />
            </div>

            <div className="w-1/2 flex flex-col justify-center px-16 gap-6">
                <div className="flex gap-3">
                    {produto.categoria && (
                        <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full">
                            {produto.categoria.nome}
                        </span>
                    )}
                    {produto.marca && (
                        <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-1 rounded-full">
                            {produto.marca.nome}
                        </span>
                    )}
                </div>

                <h1 className="text-4xl font-bold text-black leading-tight">
                    {produto.nome}
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed">
                    {produto.descricao}
                </p>

                <p className="text-4xl font-bold text-purple-800">
                    R${Number(produto.preco).toFixed(2).replace('.', ',')}
                </p>

                <div className="max-w-xs">
                    <Button
                        text={adicionando ? 'Adicionando...' : 'Adicionar ao carrinho'}
                        icon="faCartShopping"
                        onClick={handleAdd}
                        disabled={adicionando}
                    />
                </div>
            </div>
        </div>
    );
};