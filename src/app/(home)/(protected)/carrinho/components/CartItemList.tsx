"use client";

import { useEffect, useCallback } from "react";
import { CartItemCard } from "./CartItemCard";
import { SubtotalCard } from "./SubtotalCard";
import { useGetCompleteCart } from "@/src/hooks/cart/useGetCompleteCart";

export const CartItemList = () => {
  const { execute: fetchCart, isLoading, error, cart } = useGetCompleteCart();

  const loadCart = useCallback(async () => {
    const id_usuario = Number(localStorage.getItem("id_usuario"));
    const token = localStorage.getItem("auth_token");
    if (!id_usuario || !token) {
      console.warn("Usuário não logado. Redirecionando ou mostrando mensagem...");
      return;
    }
    await fetchCart(id_usuario, token);
  }, [fetchCart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const itens = cart?.itens || [];
  
  const subtotal = itens.reduce((acc: number, item: any) => {
    const preco = Number(item.preco_unitario || item.produto?.preco || 0);
    return acc + (item.quantidade * preco);
  }, 0);

  if (isLoading && !cart) {
    return <p className="text-center text-gray-500 py-10">Carregando sua sacola...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Erro: {error}</p>;
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
          itens.map((item: any, index: number) => (
            <CartItemCard
              key={item.id_item_carrinho}
              item={item}
              onUpdate={loadCart} 
            />
          ))
        )}
      </div>

      <SubtotalCard subtotal={subtotal} totalItens={itens.length} />
    </div>
  );
};