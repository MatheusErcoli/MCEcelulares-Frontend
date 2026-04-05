import { createEnderecoAPI } from '@/src/actions/endereco';
import { useState } from 'react';

export function useCreateEndereco() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEndereco = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {

      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const token = localStorage.getItem('auth_token');

      if (!id_usuario || !token) throw new Error("Você deve fazer login para cadastrar endereço");

      const data = await createEnderecoAPI(
        token,
        {id_usuario,
        formData}
      );

      if (!data.success) throw new Error(data.error);

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao adicionar endereço");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { createEndereco, loading, error };
}