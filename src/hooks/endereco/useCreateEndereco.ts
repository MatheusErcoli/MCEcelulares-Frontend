import { createEnderecoAPI } from '@/src/actions/endereco';
import { useState } from 'react';

export function useCreateEndereco() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEndereco = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const id_usuario = Number(localStorage.getItem('id_usuario'));
    const token = localStorage.getItem('auth_token');

    if (!id_usuario || !token) {
      setError('Você precisa estar logado para cadastrar um endereço.');
      setLoading(false);
      return false;
    }

    const result = await createEnderecoAPI(
      id_usuario,
      token,
      formData
    );

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return false;
    }

    return true;
  };

  return { createEndereco, loading, error };
}