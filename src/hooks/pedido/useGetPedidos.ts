import { useState, useCallback } from 'react';
import { getPedidosAPI } from '@/src/actions/pedido';

export function useGetPedidos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      const id_usuario = Number(localStorage.getItem('id_usuario'));

      if (!id_usuario || !token) throw new Error("Você deve fazer login para buscar pedidos");

      const data = await getPedidosAPI(token);

      if (!data.success) throw new Error(data.error);
      setPedidos(data.pedidos)
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar pedidos");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, pedidos };
}