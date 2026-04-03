import { updateUsuarioAPI } from '@/src/actions/usuario';
import { useState, useCallback } from 'react';

export function useUpdateUsuario() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_usuario: number, dados: { nome?: string; telefone?: string }, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await updateUsuarioAPI(id_usuario, dados, token);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error };
}