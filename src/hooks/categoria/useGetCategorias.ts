import { getCategoriasAPI } from '@/src/actions/categoria';
import { useState, useCallback } from 'react';

interface Categoria {
  id_categoria: number;
  nome: string;
}

export function useGetCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCategoriasAPI();
      setCategorias(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar categorias');
      setCategorias([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { execute, categorias, isLoading, error };
}