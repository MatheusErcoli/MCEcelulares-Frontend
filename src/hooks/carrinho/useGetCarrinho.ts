import { getCarrinhoAPI } from '@/src/actions/carrinho';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useGetCarrinho = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<ItemCarrinhoType[]>([]);
  const { token, user } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para usar o carrinho');

      const data = await getCarrinhoAPI(token, { id_usuario: user.id });

      if (!data.success) throw new Error(data.error);

      setCarrinho(data.carrinho.itens);

      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar carrinho');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error, carrinho };
};