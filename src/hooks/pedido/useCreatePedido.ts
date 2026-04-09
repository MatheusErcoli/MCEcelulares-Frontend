import { createPedidoAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useCreatePedido = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  const execute = useCallback(async (id_endereco: number, valor_total: number) => {
    setLoading(true);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para fazer pedidos');

      const data = await createPedidoAPI(token, { id_endereco, valor_total });

      if (!data.success) throw new Error(data.error);

      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao criar pedido');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error };
};