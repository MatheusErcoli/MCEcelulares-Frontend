import { getCarrinhoAPI } from '@/src/actions/carrinho';
import { useState, useCallback } from 'react';

export function useGetCarrinho() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carrinho, setCarrinho] = useState<any>(null);

  const execute = useCallback(async (id_usuario: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCarrinhoAPI(id_usuario, token);
      setCarrinho(data);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, carrinho };
}