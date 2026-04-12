import { updateProdutoAPI } from '@/src/actions/produto';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';

export const useUpdateProduto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

      setError(null);
      return { success: true };
    } catch (error) {
      setError((error as Error).message || 'Erro ao editar produto');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { execute, loading, error };
};