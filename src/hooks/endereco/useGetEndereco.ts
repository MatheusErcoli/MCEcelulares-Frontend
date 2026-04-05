import { getUsuarioAPI } from '@/src/actions/usuario';
import { useState, useCallback } from 'react';

export function useGetEnderecos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<EnderecoType[]>([]);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const token = localStorage.getItem('auth_token');

      if (!id_usuario || !token) throw new Error("Você deve fazer login para buscar endereços");
      
      const data = await getUsuarioAPI(token, {id_usuario} );

      if (!data.success) throw new Error(data.error);

      setEnderecos(data.enderecos);
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar endereços");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, enderecos };
}