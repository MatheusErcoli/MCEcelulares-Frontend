"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrCreateCart, addItemToAPI, getCartItemsAction, removeItemFromAPI } from "../actions/cart"; 

interface CartContextType {
  cartId: number | null;
  itemCount: number;
  initializeCart: (id_usuario: number) => Promise<void>;
  addToCart: (id_produto: number, preco: number) => Promise<{ success: boolean; error?: string }>;
  removeFromCart: (id_item_carrinho: number) => Promise<{ success: boolean }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<number | null>(null);
  const [itemCount, setItemCount] = useState(0);

  const initializeCart = async (id_usuario: number) => {
    const result = await fetchOrCreateCart(id_usuario);
    if (result.success && result.cartId) {
      setCartId(result.cartId);
      const itemsResult = await getCartItemsAction(result.cartId);
      if (itemsResult.success && itemsResult.items) {
        const total = itemsResult.items.reduce((acc: number, item: any) => acc + (item.quantidade || 1), 0);
        setItemCount(total);
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("id_usuario");
    if (userId) initializeCart(Number(userId));
  }, []);

  const addToCart = async (id_produto: number, preco: number) => {
    if (!cartId) return { success: false, error: "Faça login para comprar." };
    const result = await addItemToAPI(cartId, id_produto, preco);
    if (result.success) setItemCount(prev => prev + 1);
    return result;
  };

  const removeFromCart = async (id_item_carrinho: number) => {
    const result = await removeItemFromAPI(id_item_carrinho);
    if (result.success) {
      setItemCount(prev => (prev > 0 ? prev - 1 : 0));
    }
    return result;
  };

  return (
    <CartContext.Provider value={{ cartId, itemCount, initializeCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  return context;
}