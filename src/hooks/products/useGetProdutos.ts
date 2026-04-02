import { getProdutosAPI } from '@/src/actions/produto';
import { useState, useCallback } from 'react';

export function useGetProdutos() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const execute = useCallback(async (page?: number, limit?: number, id_categoria?: string, id_marca?: string, destaque?: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProdutosAPI(page, limit, id_categoria, id_marca, destaque);
      setProdutos(data.data);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, produtos, totalPages, total };
}