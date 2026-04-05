import { getUsuarioAPI } from '@/src/actions/usuario';
import { useState, useCallback } from 'react';

export function useGetUsuario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioType | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      const id_usuario = Number(localStorage.getItem('id_usuario'));

      if (!id_usuario || !token) throw new Error("Você deve fazer login para acessar sua conta");

      const data = await getUsuarioAPI(token, { id_usuario });
      if (!data.success) throw new Error(data.error);
      setUsuario(data);
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao acessar conta");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, usuario };
}