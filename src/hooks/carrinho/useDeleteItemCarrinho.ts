import { deleteItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useDeleteItemCarrinho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const execute = useCallback(async (id_item_carrinho: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error('Você deve fazer login para remover itens do carrinho');

      const data = await deleteItemCarrinhoAPI(token, { id_item_carrinho });

      if (!data.success) throw new Error(data.error);

      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao remover item do carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error };
};