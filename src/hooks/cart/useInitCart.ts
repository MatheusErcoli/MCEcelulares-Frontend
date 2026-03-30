import { initCartAPI } from '@/src/actions/cart';
import { useState, useCallback } from 'react';

export function useInitCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_usuario: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await initCartAPI(id_usuario, token);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error };
}