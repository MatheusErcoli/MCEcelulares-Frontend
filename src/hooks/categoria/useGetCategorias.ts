import { getCategoriasAPI } from '@/src/actions/categoria';
import { useState, useCallback } from 'react';

export function useGetCategorias() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCategoriasAPI();
      setCategorias(data);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, categorias };
}