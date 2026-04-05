import { getCarrinhoAPI } from '@/src/actions/carrinho';
import { useState, useCallback } from 'react';

export function useGetCarrinho() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<ItemCarrinhoType[]>([]);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const token = localStorage.getItem('auth_token');

      if (!id_usuario || !token) throw new Error("Você deve fazer login para usar o carrinho");

      const data = await getCarrinhoAPI(token,{id_usuario} );

      if (!data.success) throw new Error(data.error);

      setCarrinho(data.carrinho.itens);

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar carrinho");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, carrinho };
}