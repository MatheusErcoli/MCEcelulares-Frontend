import { useState, useCallback } from 'react';
import { getPedidosAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';

export const useGetPedidos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const { token, user } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para buscar pedidos');

      const data = await getPedidosAPI(token);

      if (!data.success) throw new Error(data.error);

      setPedidos(data.pedidos);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar pedidos');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error, pedidos };
};