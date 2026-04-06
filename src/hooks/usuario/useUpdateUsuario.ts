import { updateUsuarioAPI } from '@/src/actions/usuario';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useUpdateUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  const execute = useCallback(async (dados: { nome?: string; telefone?: string }) => {
    setLoading(true);
    setError(null);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para atualizar sua conta');

      const data = await updateUsuarioAPI(token, { id_usuario: user.id, dados });

      if (!data.success) throw new Error(data.error);

      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao editar dados da conta');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error };
};