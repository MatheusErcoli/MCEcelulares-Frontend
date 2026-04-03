import { createCarrinhoAPI, createItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useState, useCallback } from 'react';

export function useCreateItemCarrinho() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    id_usuario: number,
    id_produto: number,
    preco_unitario: number,
    token: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const cartData = await createCarrinhoAPI(id_usuario, token);

      const id_carrinho = cartData.id_carrinho;

      await createItemCarrinhoAPI(
        id_usuario,
        id_produto,
        preco_unitario,
        token
      );

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      console.error("Erro ao adicionar item:", err);
      setError(err.message || "Erro ao adicionar produto");
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error };
}