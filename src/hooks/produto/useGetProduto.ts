import { getProdutoAPI } from '@/src/actions/produto';
import { useState, useCallback } from 'react';

export function useGetProduto() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [produto, setProduto] = useState<ProdutoType | null>(null);

  const execute = useCallback(async (id_produto: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProdutoAPI(id_produto);
      setProduto(data);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, produto };
}