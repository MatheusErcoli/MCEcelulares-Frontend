'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetMarcas } from '@/src/hooks/marca/useGetMarcas';
import { useUpdateMarca } from '@/src/hooks/marca/useUpdateMarca';
import { Icon } from '@/src/components/layout/Icon';
import { InputWhite } from '@/src/components/layout/InputWhite';
import { Button } from '@/src/components/layout/Button';

export const UpdateMarcaForm = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));

  const { execute: fetchMarcas, marcas, loading } = useGetMarcas();
  const { execute: updateMarca, loading: atualizando } = useUpdateMarca();

  const [editando, setEditando] = useState(false);

  const marca = marcas.find((m) => m.id_marca === id) ?? null;

  useEffect(() => {
    if (id) fetchMarcas();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateMarca(id, formData);

    if (result?.success) {
      setEditando(false);
      fetchMarcas();
    }
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Editar Marca</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faStar" className="text-purple-700" />
              Dados da marca
            </h2>
            {!loading && marca && (
              <Button
                icon={editando ? 'faXmark' : 'faPen'}
                onClick={() => setEditando(!editando)}
                className="text-purple-700 hover:opacity-75 transition-opacity"
              />
            )}
          </div>

          {loading ? (
            <p className="text-gray-400 animate-pulse">Carregando...</p>
          ) : !marca ? (
            <p className="text-red-500 text-sm">Erro ao carregar dados da marca.</p>
          ) : editando ? (
            <form action={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                <InputWhite
                  name="nome"
                  type="text"
                  placeholder="Nome da marca"
                  required
                  minLength={2}
                  maxLength={100}
                  defaultValue={marca.nome}
                />
              </div>

              <Button
                text={atualizando ? 'Salvando...' : 'Salvar alterações'}
                type="submit"
                disabled={atualizando}
              />
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                <p className="font-medium text-gray-900">{marca.nome}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">ID</p>
                <p className="font-medium text-gray-900">#{marca.id_marca}</p>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
};