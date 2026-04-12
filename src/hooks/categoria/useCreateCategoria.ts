import { createCategoriaAPI } from '@/src/actions/categoria';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useCreateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      if (!token || !user?.admin) {throw new Error('Você deve fazer login como admnistrador para cadastrar uma categoria');}
      
      const data = await createCategoriaAPI(token, {
        nome: formData.get('nome') as string,
        descricao: formData.get('descricao') as string,
      });

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Categoria cadastrada com sucesso!',
        text: 'A categoria já está disponível no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar categoria',
        text: (error as Error).message || 'Não foi possível cadastrar a categoria',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading };
};