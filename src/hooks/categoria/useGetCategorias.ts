import { getCategoriasAPI } from '@/src/actions/categoria';
import { useState, useCallback } from 'react';

export function useGetCategorias() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoriasAPI();

      if (!data.success) throw new Error(data.error);

      setCategorias(data.categorias);
      
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar categorias");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, categorias, loading, error };
}