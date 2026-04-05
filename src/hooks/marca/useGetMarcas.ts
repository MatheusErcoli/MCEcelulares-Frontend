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
      const data = await getMarcasAPI({id_categoria});

      if (!data.success) throw new Error(data.error);

      setMarcas(data.marcas);
      return { 
        success: true,
        message: data.message
       };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar marcas");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);
 
  return { execute, marcas, loading, error };
}