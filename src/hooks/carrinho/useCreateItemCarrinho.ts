import { createCarrinhoAPI, createItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useState, useCallback } from 'react';

export function useCreateItemCarrinho() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    id_produto: number,
    preco_unitario: number
  ) => {
    setLoading(true);
    setError(null);

    try {

      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const token = localStorage.getItem('auth_token');

      if (!id_usuario || !token) throw new Error("Você deve fazer login para adicionar itens ao carrinho");

      const dataCarrinho = await createCarrinhoAPI(token, { id_usuario });

      if (!dataCarrinho.success || !dataCarrinho.id_carrinho) {
        throw new Error(dataCarrinho.error);
      }

      const dataItemCarrinho = await createItemCarrinhoAPI(
        token,
        {
          id_carrinho: dataCarrinho.id_carrinho,
          id_produto,
          preco_unitario
        }
      );

      if (!dataItemCarrinho.success) throw new Error(dataItemCarrinho.error);

      return {
        success: true,
        message: dataItemCarrinho.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao adicionar item ao carrinho");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}