import { deleteEnderecoAPI } from '@/src/actions/endereco';
import { useState, useCallback } from 'react';

export function useDeleteEndereco() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_endereco: number) => {
    setLoading(true);
    setError(null);
    try {

      const token = localStorage.getItem('auth_token');

      if (!token) throw new Error("Você deve fazer login para remover endereço");

      const data = await deleteEnderecoAPI(token,{id_endereco});

      if (!data.success) throw new Error(data.error);

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao remover endereço");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}