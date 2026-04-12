'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetCategorias } from '@/src/hooks/categoria/useGetCategorias';
import { useUpdateCategoria } from '@/src/hooks/categoria/useUpdateCategoria';
import { Icon } from '@/src/components/layout/Icon';
import { Input } from '@/src/components/layout/Input';
import { Button } from '@/src/components/layout/Button';

export const UpdateCategoriaForm = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));

  const { execute: fetchCategorias, categorias, loading } = useGetCategorias();
  const { execute: updateCategoria, loading: atualizando } = useUpdateCategoria();

  const [editando, setEditando] = useState(false);

  const categoria = categorias.find((c) => c.id_categoria === id) ?? null;

  useEffect(() => {
    if (id) fetchCategorias();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateCategoria(id, formData);

    if (result?.success) {
      setEditando(false);
      fetchCategorias();
    }
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Editar Categoria</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faList" className="text-purple-700" />
              Dados da categoria
            </h2>
            {!loading && categoria && (
              <Button
                icon={editando ? 'faXmark' : 'faPen'}
                onClick={() => setEditando(!editando)}
                className="text-purple-700 hover:opacity-75 transition-opacity"
              />
            )}
          </div>

          {loading ? (
            <p className="text-gray-400 animate-pulse">Carregando...</p>
          ) : !categoria ? (
            <p className="text-red-500 text-sm">Erro ao carregar dados da categoria.</p>
          ) : editando ? (
            <form action={handleSubmit} className="flex flex-col gap-6">

              <Input
                variant="white"
                name="nome"
                type="text"
                placeholder="Nome da categoria"
                required
                minLength={2}
                maxLength={100}
                title="O nome deve ter entre 2 e 100 caracteres."
                defaultValue={categoria.nome}
              />

              <textarea
                name="descricao"
                required
                placeholder="Descrição da categoria..."
                rows={4}
                minLength={5}
                maxLength={300}
                title="A descrição deve ter entre 5 e 300 caracteres."
                defaultValue={categoria.descricao ?? ''}
                className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
              />

              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-500 uppercase font-semibold px-2">Status</p>
                <select
                  name="ativo"
                  required
                  defaultValue={categoria.ativo ? '1' : '0'}
                  className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecione...</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </select>
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
                <p className="font-medium text-gray-900">{categoria.nome}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">ID</p>
                <p className="font-medium text-gray-900">#{categoria.id_categoria}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                <p className="font-medium text-gray-900">{categoria.ativo ? 'Ativo' : 'Inativo'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-400 uppercase font-semibold">Descrição</p>
                <p className="font-medium text-gray-900">{categoria.descricao}</p>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
};