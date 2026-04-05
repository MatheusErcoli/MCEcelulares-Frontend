import { createPedidoAPI } from '@/src/actions/pedido';
import { useState, useCallback } from 'react';

export function useCreatePedido() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_endereco: number, valor_total: number) => {
    setLoading(true);
    setError(null);

    try {
      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const token = localStorage.getItem('auth_token');

      if (!id_usuario || !token) throw new Error("Você deve fazer login para fazer pedidos");

      const data = await createPedidoAPI(token, {
        id_usuario,
        id_endereco,
        valor_total: valor_total,
      });

      if (!data.success) throw new Error(data.error);

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao criar pedido");
      return { success: false };
    } finally {
      setLoading(false);
    }
  },
    []
  );

  return { execute, loading, error };
}