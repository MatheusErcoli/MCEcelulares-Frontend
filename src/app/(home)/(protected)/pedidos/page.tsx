'use client';

import { useEffect } from 'react';
import { useGetPedidos } from '@/src/hooks/pedido/useGetPedidos';
import { PedidoCard } from './components/PedidoCard';

export default function Pedidos() {
  const { execute, isLoading, error, pedidos } = useGetPedidos();

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

      {isLoading && (
        <p className="text-center text-gray-400 py-16">Carregando pedidos...</p>
      )}

      {error && (
        <p className="text-center text-red-500 py-16">Erro: {error}</p>
      )}

      {!isLoading && !error && pedidos.length === 0 && (
        <div className="bg-white rounded-[40px] p-16 text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-xl font-semibold">Você ainda não fez nenhum pedido.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id_pedido} pedido={pedido} />
        ))}
      </div>
    </main>
  );
}