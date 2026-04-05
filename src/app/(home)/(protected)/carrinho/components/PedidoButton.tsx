'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { SubtotalCard } from './SubtotalCard';
import { useCreatePedido } from '@/src/hooks/pedido/useCreatePedido';

interface PedidoButton {
  subtotal: number;
  totalItens: number;
  selectedEndereco: EnderecoType | null;
  enderecoSelector: ReactNode;
}

export const PedidoButton = ({
  subtotal,
  totalItens,
  selectedEndereco,
  enderecoSelector,
}: PedidoButton) => {
  const router = useRouter();
  const { execute: finalizarPedido, loading: finalizando, error: errorPedido } = useCreatePedido();
  const [pedidoSucesso, setPedidoSucesso] = useState(false);

  const handleFinalizar = async () => {
    if (!selectedEndereco) return;
    const resultado = await finalizarPedido(selectedEndereco.id_endereco, subtotal);
    if (resultado.success) {
      setPedidoSucesso(true);
      setTimeout(() => router.push('/pedidos'), 2500);
    }
  };

  if (pedidoSucesso) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pedido realizado!</h2>
        <p className="text-gray-500">Você será redirecionado para seus pedidos...</p>
      </div>
    );
  }

  return (
    <SubtotalCard
      subtotal={subtotal}
      totalItens={totalItens}
      enderecoSelecionado={selectedEndereco}
      finalizando={finalizando}
      errorPedido={errorPedido}
      onFinalizar={handleFinalizar}
      enderecoSelector={enderecoSelector}
    />
  );
};