import { deleteItemCarrinhoAPI } from '@/src/actions/carrinho';
import { useState, useCallback } from 'react';
export function useDeleteItemCarrinho() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_item_carrinho: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');

      if (!token) throw new Error("Você deve fazer login para remover itens do carrinho");
      
      const data = await deleteItemCarrinhoAPI(token,{id_item_carrinho});

      if (!data.success) throw new Error(data.error);

      return { 
        success: true,
        message: data.message 
       };
    } catch (error) {
      setError((error as Error).message || "Erro ao remover item do carrinho");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}