import { getUsuarioAPI } from '@/src/actions/usuario';
import { useState, useCallback } from 'react';

export function useGetEnderecos() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<EnderecoType[]>([]);

  const execute = useCallback(async (id_usuario: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsuarioAPI(id_usuario, token);
      setEnderecos(data.enderecos || []);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, enderecos };
}