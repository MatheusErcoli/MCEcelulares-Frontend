import { deleteItemAPI } from '@/src/actions/cart';
import { useState, useCallback } from 'react';
export function useDeleteItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_item_carrinho: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteItemAPI(id_item_carrinho, token);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error };
}