import { updateCategoriaAPI } from '@/src/actions/categoria';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useUpdateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  const execute = useCallback(async (id_categoria: number, formData: FormData) => {
    setLoading(true);
    try {
      if (!token || !user?.admin) throw new Error('Você deve fazer login como administrador para atualizar uma categoria');

      const dados = {
        nome: formData.get('nome') as string,
        descricao: formData.get('descricao') as string,
      };

      const data = await updateCategoriaAPI(token, id_categoria, dados);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Categoria atualizada com sucesso!',
        text: 'As alterações já estão disponíveis no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar categoria',
        text: (error as Error).message || 'Não foi possível atualizar a categoria',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading };
};