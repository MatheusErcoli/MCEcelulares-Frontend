'use client';

import { useEffect } from 'react';
import { useGetPedidos } from '@/src/hooks/pedido/useGetPedidos';
import { PedidoCard } from './PedidoCard';

export const PedidoList = () => {
  const { execute: fetchPedidos, loading, error, pedidos } = useGetPedidos();

  useEffect(() => { fetchPedidos(); }, []);

  if (loading) {
    return <p className="text-gray-400 animate-pulse text-sm">Carregando pedidos...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (pedidos.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-8 border-2 border-dashed border-gray-200 text-center">
        <p className="text-gray-400 text-sm">Você ainda não fez nenhum pedido.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id_pedido} pedido={pedido} />
      ))}
    </div>
  );
};