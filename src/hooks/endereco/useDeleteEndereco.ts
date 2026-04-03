import { deleteEnderecoAPI } from '@/src/actions/endereco';
import { useState, useCallback } from 'react';

export function useDeleteEndereco() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id_endereco: number, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteEnderecoAPI(id_endereco, token);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  return { execute, isLoading, error };
}