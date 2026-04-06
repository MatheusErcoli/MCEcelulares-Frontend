import { createCarrinhoAPI, createItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useCreateItemCarrinho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  const execute = useCallback(async (id_produto: number, preco_unitario: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para adicionar itens ao carrinho');

      const dataCarrinho = await createCarrinhoAPI(token);

      if (!dataCarrinho.success || !dataCarrinho.id_carrinho) {
        throw new Error(dataCarrinho.error);
      }

      const dataItemCarrinho = await createItemCarrinhoAPI(token, {
        id_carrinho: dataCarrinho.id_carrinho,
        id_produto,
        preco_unitario,
      });

      if (!dataItemCarrinho.success) throw new Error(dataItemCarrinho.error);

      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao adicionar item ao carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error };
};