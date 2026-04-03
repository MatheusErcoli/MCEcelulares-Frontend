'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useGetUsuario } from '@/src/hooks/usuario/useGetUsuario';
import { useUpdateUsuario } from '@/src/hooks/usuario/useUpdateUsuario';
import { EnderecoCard } from './EnderecoCard';
import { Icon } from '@/src/components/Icon';
import { Button } from '@/src/components/Button';
import { InputWhite } from '@/src/components/InputWhite';

export const ProfilePage = () => {
  const { execute: buscarUsuario, usuario, isLoading } = useGetUsuario();
  const { execute: atualizar, isLoading: atualizando, error } = useUpdateUsuario();

  const [editando, setEditando] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const carregar = () => {
    const id_usuario = Number(localStorage.getItem('id_usuario'));
    const token = localStorage.getItem('auth_token');
    if (!id_usuario || !token) return;
    buscarUsuario(id_usuario, token);
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const id_usuario = Number(localStorage.getItem('id_usuario'));
    const token = localStorage.getItem('auth_token');
    if (!id_usuario || !token) return;

    const res = await atualizar(id_usuario, {
      nome: formData.get('nome') as string,
      telefone: formData.get('telefone') as string,
    }, token);

    if (res.success) {
      setEditando(false);
      carregar();
    } else {
      alert(error || 'Erro ao atualizar dados.');
    }
  };

  return (
    <main className="min-h-screen md:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">

        <h1 className="text-4xl font-bold">Meu Perfil</h1>

        <section className="bg-gray-200 rounded-[40px] p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faUser" className="text-purple-700" />
              Dados pessoais
            </h2>
            {!isLoading && usuario && (
              <Button
                icon={editando ? 'faXmark' : 'faPen'}
                onClick={() => setEditando(!editando)}
                className="text-purple-700 hover:opacity-75 transition-opacity"
              />
            )}
          </div>

          {isLoading ? (
            <p className="text-gray-400 animate-pulse">Carregando...</p>
          ) : usuario ? (
            editando ? (
              <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold">Nome</p>
                    <InputWhite name="nome" type="text" placeholder="Nome" required={true} defaultValue={usuario.nome} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold">Telefone</p>
                    <InputWhite name="telefone" type="tel" placeholder="Telefone" required={true} defaultValue={usuario.telefone} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold">E-mail</p>
                    <p className="font-medium text-gray-500">{usuario.email}</p>
                    <p className="text-xs text-gray-400">O e-mail não pode ser alterado.</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold">CPF</p>
                    <p className="font-medium text-gray-500">{usuario.cpf}</p>
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
                  <p className="font-medium text-gray-900">{usuario.nome}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">E-mail</p>
                  <p className="font-medium text-gray-900">{usuario.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">CPF</p>
                  <p className="font-medium text-gray-900">{usuario.cpf}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Telefone</p>
                  <p className="font-medium text-gray-900">{usuario.telefone}</p>
                </div>
              </div>
            )
          ) : (
            <p className="text-red-500 text-sm">Erro ao carregar dados.</p>
          )}
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
              <Icon name="faLocationDot" className="text-purple-700" />
              Meus endereços
            </h2>
            <Link href="/conta/endereco">
              <Button
                text="Adicionar"
                icon="faPlus"
                className="flex items-center gap-2 bg-gradient-to-r from-[#5714d7] to-[#7929c8] text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
              />
            </Link>
          </div>

          {isLoading ? (
            <p className="text-gray-400 animate-pulse">Carregando endereços...</p>
          ) : usuario?.enderecos?.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum endereço cadastrado.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {usuario?.enderecos?.map((e) => (
                <EnderecoCard
                  key={e.id_endereco}
                  endereco={e}
                  onDelete={() => carregar()}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
};