import { getMarcasAPI } from '@/src/actions/marca';
import { useState, useCallback } from 'react';
 
interface Marca {
  id_marca: number;
  nome: string;
}
 
export function useGetMarcas() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const execute = useCallback(async (id_categoria?: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMarcasAPI(id_categoria);
      setMarcas(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar marcas');
      setMarcas([]);
    } finally {
      setLoading(false);
    }
  }, []);
 
  return { execute, marcas, loading, error };
}