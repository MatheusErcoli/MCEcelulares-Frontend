import { getUsuarioAPI } from '@/src/actions/usuario';
import { useState, useCallback } from 'react';

export function useGetUsuario() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);

  const execute = useCallback(async (id_usuario: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsuarioAPI(id_usuario, token);
      setUsuario(data);
      setIsLoading(false);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error, usuario };
}