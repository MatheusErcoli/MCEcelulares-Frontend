import { deleteEnderecoAPI } from '@/src/actions/endereco';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useDeleteEndereco = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const execute = useCallback(async (id_endereco: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error('Você deve fazer login para remover endereço');

      const data = await deleteEnderecoAPI(token, { id_endereco });

      if (!data.success) throw new Error(data.error);

      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao remover endereço');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error };
};