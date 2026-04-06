import { createEnderecoAPI } from '@/src/actions/endereco';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';

export const useCreateEndereco = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para cadastrar endereço');

      const data = await createEnderecoAPI(token, {
        endereco: formData.get('endereco') as string,
        numero: formData.get('numero') as string,
        complemento: formData.get('complemento') as string,
        bairro: formData.get('bairro') as string,
        cidade: formData.get('cidade') as string,
        estado: formData.get('estado') as string,
        cep: formData.get('cep') as string,
      });

      if (!data.success) throw new Error(data.error);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao adicionar endereço');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading, error };
};