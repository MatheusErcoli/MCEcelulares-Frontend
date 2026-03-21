// CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrCreateCart, addItemToAPI } from "../actions/cart"; // Ajuste o caminho

interface CartContextType {
  cartId: number | null;
  itemCount: number;
  initializeCart: (id_usuario: number) => Promise<void>;
  addToCart: (id_produto: number, preco: number) => Promise<{ success: boolean; error?: string }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<number | null>(null);
  const [itemCount, setItemCount] = useState(0); // Apenas visual para o Header

  // Função para "acordar" o carrinho
  const initializeCart = async (id_usuario: number) => {
    const result = await fetchOrCreateCart(id_usuario);
    if (result.success && result.cartId) {
      setCartId(result.cartId);
      // Dica: Se quiser, aqui você poderia fazer um fetch extra para ver quantos itens
      // já tem nesse carrinho e atualizar o setItemCount.
    }
  };

  // Se o usuário recarregar a página (F5), tentamos recuperar o ID dele do LocalStorage
  useEffect(() => {
    const userId = localStorage.getItem("id_usuario");
    if (userId) {
      initializeCart(Number(userId));
    }
  }, []);

  // Função chamada pelo botão "Comprar"
  const addToCart = async (id_produto: number, preco: number) => {
    if (!cartId) return { success: false, error: "Faça login para comprar." };

    const result = await addItemToAPI(cartId, id_produto, preco);
    
    if (result.success) {
      setItemCount(prev => prev + 1); // Atualiza a bolinha no Header
    }
    
    return result;
  };

  return (
    <CartContext.Provider value={{ cartId, itemCount, initializeCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar o contexto fácil
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  return context;
}