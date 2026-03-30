import { getCompleteCartAPI } from '@/src/actions/cart';
import { useState, useCallback } from 'react';

export function useGetCompleteCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<any>(null);

  const execute = useCallback(async (id_usuario: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCompleteCartAPI(id_usuario, token);
      setCart(data);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, cart };
}