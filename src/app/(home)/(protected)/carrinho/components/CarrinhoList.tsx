"use client";

import { useEffect } from "react";
import { useGetCarrinho } from "@/src/hooks/carrinho/useGetCarrinho";
import { ItemCarrinhoCard } from "./ItemCarrinhoCard";
import { SubtotalCard } from "./SubtotalCard";

export const CarrinhoList = () => {
  const { execute: fetchCarrinho, loading, error, carrinho } = useGetCarrinho();

  useEffect(() => { fetchCarrinho() }, []);

  if (loading && !carrinho) {
    return <p className="text-center text-gray-500 py-10">Carregando sua sacola...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Erro: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 flex flex-col gap-5">
        {carrinho.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-semibold">
              Seu carrinho está vazio.
            </p>
          </div>
        ) : (
          carrinho.map((item) => (
            <ItemCarrinhoCard
              key={item.id_item_carrinho}
              item={item}
              onUpdate={fetchCarrinho}
            />
          ))
        )}
      </div>

      <SubtotalCard carrinho={carrinho} />
    </div>
  );
};