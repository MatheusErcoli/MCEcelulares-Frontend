'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProduto } from '@/src/hooks/produto/useGetProduto';
import { useUpdateProduto } from '@/src/hooks/produto/useUpdateProduto';
import { Icon } from '@/src/components/layout/Icon';
import { InputWhite } from '@/src/components/layout/InputWhite';
import { Button } from '@/src/components/layout/Button';

export const UpdateProdutoForm = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));

  const { execute: fetchProduto, produto, loading } = useGetProduto();
  const { execute: updateProduto, loading: atualizando } = useUpdateProduto();

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (id) fetchProduto(id);
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateProduto(id, formData);

    if (result?.success) {
      setEditando(false);
      fetchProduto(id);
    }
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Editar Produto</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faBox" className="text-purple-700" />
              Dados do produto
            </h2>
            {!loading && produto && (
              <Button
                icon={editando ? 'faXmark' : 'faPen'}
                onClick={() => setEditando(!editando)}
                className="text-purple-700 hover:opacity-75 transition-opacity"
              />
            )}
          </div>

          {loading ? (
            <p className="text-gray-400 animate-pulse">Carregando...</p>
          ) : !produto ? (
            <p className="text-red-500 text-sm">Erro ao carregar dados do produto.</p>
          ) : editando ? (
            <form action={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                <InputWhite
                  name="nome"
                  type="text"
                  placeholder="Nome do produto"
                  required
                  minLength={2}
                  maxLength={150}
                  defaultValue={produto.nome}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase font-semibold">Descrição</p>
                <textarea
                  name="descricao"
                  required
                  placeholder="Descrição do produto..."
                  rows={4}
                  minLength={5}
                  maxLength={500}
                  defaultValue={produto.descricao}
                  className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Preço (R$)</p>
                  <InputWhite
                    name="preco"
                    type="number"
                    placeholder="Preço (R$)"
                    required
                    min={0.01}
                    step={0.01}
                    defaultValue={produto.preco}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Estoque</p>
                  <InputWhite
                    name="estoque"
                    type="number"
                    placeholder="Estoque"
                    required
                    min={0}
                    step={1}
                    defaultValue={produto.estoque}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase font-semibold">URL da imagem</p>
                <InputWhite
                  name="imagem"
                  type="url"
                  placeholder="URL da imagem"
                  required
                  defaultValue={produto.imagem}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">ID da categoria</p>
                  <InputWhite
                    name="id_categoria"
                    type="number"
                    placeholder="ID da categoria"
                    required
                    min={1}
                    step={1}
                    defaultValue={produto.id_categoria}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 uppercase font-semibold">ID da marca</p>
                  <InputWhite
                    name="id_marca"
                    type="number"
                    placeholder="ID da marca"
                    required
                    min={1}
                    step={1}
                    defaultValue={produto.id_marca}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Destaque</p>
                  <select
                    name="destaque"
                    required
                    defaultValue={produto.destaque ? '1' : '0'}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                  >
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                  <select
                    name="ativo"
                    required
                    defaultValue={produto.ativo ? '1' : '0'}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                  >
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </select>
                </div>
              </div>

              <Button
                text={atualizando ? 'Salvando...' : 'Salvar alterações'}
                type="submit"
                disabled={atualizando}
              />
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                <p className="font-medium text-gray-900">{produto.nome}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Preço</p>
                <p className="font-medium text-gray-900">R$ {produto.preco}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 uppercase font-semibold">Descrição</p>
                <p className="font-medium text-gray-900">{produto.descricao}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Estoque</p>
                <p className="font-medium text-gray-900">{produto.estoque} unidades</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                <p className="font-medium text-gray-900">{produto.ativo ? 'Ativo' : 'Inativo'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Destaque</p>
                <p className="font-medium text-gray-900">{produto.destaque ? 'Sim' : 'Não'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Categoria</p>
                <p className="font-medium text-gray-900">
                  {produto.categoria ? produto.categoria.nome : `ID ${produto.id_categoria}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Marca</p>
                <p className="font-medium text-gray-900">
                  {produto.marca ? produto.marca.nome : `ID ${produto.id_marca}`}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 uppercase font-semibold">Imagem</p>
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="mt-2 h-32 object-contain rounded-2xl bg-white p-2"
                />
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
};