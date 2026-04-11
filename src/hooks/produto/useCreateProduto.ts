import { createProdutoAPI } from '@/src/actions/produto';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useCreateProduto = () => {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      if (!token || !user?.admin) {throw new Error('Você deve fazer login como admnistrador para cadastrar um produto');}

      const data = await createProdutoAPI(token, {
        nome: formData.get('nome') as string,
        descricao: formData.get('descricao') as string,
        preco: Number(formData.get('preco')),
        estoque: Number(formData.get('estoque')),
        imagem: formData.get('imagem') as string,
        destaque: formData.get('destaque') === "1",
        ativo: formData.get('ativo') === "1",
        id_marca: Number(formData.get('id_marca')),
        id_categoria: Number(formData.get('id_categoria')),
      });

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: 'success',
        title: 'Produto cadastrado com sucesso!',
        text: 'O produto já está disponível no sistema.',
      });

      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar produto',
        text: (error as Error).message || 'Não foi possível cadastrar o produto',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  return { execute, loading };
};