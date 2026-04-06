import { getEnderecosAPI } from '@/src/actions/endereco';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useGetEnderecos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enderecos, setEnderecos] = useState<EnderecoType[]>([]);
  const { token, user } = useAuth();

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para buscar endereços');

      const data = await getEnderecosAPI(token, { id_usuario: user.id });

      if (!data.success) throw new Error(data.error);

      setEnderecos(data.enderecos);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao buscar endereços');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error, enderecos };
};