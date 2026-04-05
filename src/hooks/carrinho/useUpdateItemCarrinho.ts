import { updateItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useState, useCallback } from 'react';

export function useUpdateItemCarrinho() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_item_carrinho: number, quantidade: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');

      if (!token) throw new Error("Você deve fazer login para cadastrar endereço");

      const data = await updateItemCarrinhoAPI(token, {id_item_carrinho, quantidade} );

      if (!data.success) throw new Error(data.error);

      return { 
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao alterar item do carrinho");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}