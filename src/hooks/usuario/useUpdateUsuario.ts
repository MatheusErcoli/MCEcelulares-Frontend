import { updateUsuarioAPI } from '@/src/actions/usuario';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useUpdateUsuario = () => {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      if (!token || !user) throw new Error('Você deve fazer login para atualizar sua conta');

      const data = await updateUsuarioAPI(token, user.id, formData);

      if (!data.success) throw new Error(data.error);

      const nome = formData.get('nome') as string;

      Swal.fire({
        icon: 'success',
        title: 'Perfil atualizado com sucesso!',
        text: 'Suas informações foram salvas.',
      });

      return { success: true, nome };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar perfil',
        text: (error as Error).message || 'Não foi possível atualizar os dados da conta',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading };
};