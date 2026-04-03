"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SubtotalCard } from "./SubtotalCard";
import { EnderecoSelector } from "./EnderecoSelector";
import { useGetCarrinho } from "@/src/hooks/carrinho/useGetCarrinho";
import { ItemCarrinhoCard } from "./ItemCarrinhoCard";
import { useGetEnderecos } from "@/src/hooks/endereco/useGetEndereco";
import { useCreatePedido } from "@/src/hooks/pedido/useCreatePedido";

export const CarrinhoList = () => {
  const router = useRouter();

  const { execute: fetchCarrinho, isLoading, error, carrinho } = useGetCarrinho();
  const { execute: fetchEnderecos, isLoading: loadingEnderecos, enderecos } = useGetEnderecos();
  const { execute: finalizarPedido, isLoading: finalizando, error: errorPedido } = useCreatePedido();

  const [selectedEnderecoId, setSelectedEnderecoId] = useState<number | null>(null);
  const [pedidoSucesso, setPedidoSucesso] = useState(false);

  const loadCarrinho = useCallback(async () => {
    const id_usuario = Number(localStorage.getItem("id_usuario"));
    const token = localStorage.getItem("auth_token");
    if (!id_usuario || !token) return;
    await fetchCarrinho(id_usuario, token);
  }, [fetchCarrinho]);

  useEffect(() => {
    const id_usuario = Number(localStorage.getItem("id_usuario"));
    const token = localStorage.getItem("auth_token");
    if (!id_usuario || !token) return;
    loadCarrinho();
    fetchEnderecos(id_usuario, token);
  }, [loadCarrinho, fetchEnderecos]);

  useEffect(() => {
    if (enderecos.length > 0 && selectedEnderecoId === null) {
      setSelectedEnderecoId(enderecos[0].id_endereco);
    }
  }, [enderecos, selectedEnderecoId]);

  const itens = carrinho?.itens || [];

  const subtotal = itens.reduce((acc: number, item: any) => {
    const preco = Number(item.preco_unitario || item.produto?.preco || 0);
    return acc + item.quantidade * preco;
  }, 0);

  const enderecoSelecionado = enderecos.find((e) => e.id_endereco === selectedEnderecoId) ?? null;

const handleFinalizar = async () => {
  if (!selectedEnderecoId) return;
  const resultado = await finalizarPedido(itens, subtotal, selectedEnderecoId);
  if (resultado.success) {
    setPedidoSucesso(true);
    setTimeout(() => router.push("/pedidos"), 2500);
  }
};

  if (isLoading && !carrinho) {
    return <p className="text-center text-gray-500 py-10">Carregando sua sacola...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Erro: {error}</p>;
  }

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <div className="lg:col-span-2 flex flex-col gap-5">
        {itens.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-semibold">
              Seu carrinho está vazio.
            </p>
          </div>
        ) : (
          itens.map((item: any) => (
            <ItemCarrinhoCard
              key={item.id_item_carrinho}
              item={item}
              onUpdate={loadCarrinho}
            />
          ))
        )}
      </div>

      <SubtotalCard
        subtotal={subtotal}
        totalItens={itens.length}
        enderecoSelecionado={enderecoSelecionado}
        finalizando={finalizando}
        errorPedido={errorPedido}
        onFinalizar={handleFinalizar}
        enderecoSelector={
          <EnderecoSelector
            enderecos={enderecos}
            selectedId={selectedEnderecoId}
            onSelect={setSelectedEnderecoId}
            isLoading={loadingEnderecos}
          />
        }
      />
    </div>
  );
};