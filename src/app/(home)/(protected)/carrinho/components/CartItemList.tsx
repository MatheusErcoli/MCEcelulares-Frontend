"use client";

import { useEffect, useState } from "react";
import { getActiveCartByUser } from "@/src/actions/cart";
import { CartItemCard } from "./CartItemCard";
import { SubtotalCard } from "./SubtotalCard"; // Importando o subtotal aqui dentro
import { useAuth } from "@/src/contexts/AuthContext";

export const CartItemList = () => {
  const [itens, setItens] = useState<CartItemType[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { token, user } = useAuth();

  // Função de busca (Refetch)
  async function buscarCarrinho() {
    try {
      if (token && user) {
        const dadosDoCarrinho = await getActiveCartByUser(user.id, token);

        if (dadosDoCarrinho && dadosDoCarrinho.cart) {
          setItens(dadosDoCarrinho.cart.itens || []);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar os itens do carrinho:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarCarrinho();
  }, [token, user]);

  if (carregando) {
    return <p>Carregando seu carrinho...</p>;
  }

  // 1. A MÁGICA DO CÁLCULO: Percorre a lista e soma (quantidade * preco)
  const subtotal = itens.reduce((acumulador, item) => {
    const preco = Number(item.preco_unitario);
    return acumulador + preco * item.quantidade;
  }, 0);

  return (
    // Mantendo a mesma grid que estava na sua page.tsx original!
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* LADO ESQUERDO: LISTA DE ITENS */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        {itens.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-semibold">
              Seu carrinho está vazio.
            </p>
          </div>
        ) : (
          itens.map((item, index) => (
            <CartItemCard
              key={item.id_item_carrinho || index}
              item={item}
              onUpdate={buscarCarrinho}
            />
          ))
        )}
      </div>

      <SubtotalCard subtotal={subtotal} totalItens={itens.length} />
    </div>
  );
};