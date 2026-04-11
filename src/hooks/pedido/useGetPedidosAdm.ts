import { useState, useCallback } from 'react';
import { getAllPedidosAdminAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';

export const useGetPedidosAdm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);
  const { token } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para buscar pedidos');

      const data = await getAllPedidosAdminAPI(token);

      if (!data.success) throw new Error(data.error);

      setPedidos(data.pedidos ?? []);
      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar pedidos');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error, pedidos };
};