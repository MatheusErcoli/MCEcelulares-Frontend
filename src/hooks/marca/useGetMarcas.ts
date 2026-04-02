import { getMarcasAPI } from '@/src/actions/marca';
import { useState, useCallback } from 'react';

export function useGetMarcas() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marcas, setMarcas] = useState<CategoriaType[]>([]);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMarcasAPI();
      setMarcas(data);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, marcas };
}