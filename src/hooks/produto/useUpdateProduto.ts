import { updateProdutoAPI } from '@/src/actions/produto';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useUpdateProduto = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_produto: number, formData: FormData) => {
    setLoading(true);
    try {
      if (!token) throw new Error('Você deve fazer login para atualizar um produto');

      const dados = {
        nome: formData.get('nome') as string,
        descricao: formData.get('descricao') as string,
        preco: Number(formData.get('preco')),
        estoque: Number(formData.get('estoque')),
        imagem: formData.get('imagem') as string,
        id_categoria: Number(formData.get('id_categoria')),
        id_marca: Number(formData.get('id_marca')),
        destaque: formData.get('destaque') === '1',
        ativo: formData.get('ativo') === '1',
      };

      const data = await updateProdutoAPI(token, id_produto, dados);

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Produto atualizado com sucesso!',
        text: 'As alterações já estão disponíveis no sistema.',
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar produto',
        text: (error as Error).message || 'Não foi possível atualizar a produto',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, };
};