import { updateUsuarioAPI } from '@/src/actions/usuario';
import { useState, useCallback } from 'react';

export function useUpdateUsuario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (dados: { nome?: string; telefone?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      const id_usuario = Number(localStorage.getItem('id_usuario'));

      if (!id_usuario || !token) throw new Error("Você deve fazer login para atualizar sua conta");

      const data = await updateUsuarioAPI(token, { id_usuario, dados });

      if (!data.success) throw new Error(data.error);

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao editar dados da conta");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}