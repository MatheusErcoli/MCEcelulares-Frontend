import { useState, useCallback } from 'react';
import { createPedidoAPI, createItemPedidoAPI } from '@/src/actions/pedido';
import { deleteItemCarrinhoAPI } from '@/src/actions/carrinho';

interface ItemCarrinho {
  id_item_carrinho: number;
  id_produto?: number;
  produto?: { id_produto: number };
  quantidade: number;
  preco_unitario?: number;
  produto_preco?: number;
}

export function useCreatePedido() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const execute = useCallback(
  async (itens: ItemCarrinho[], valorTotal: number, id_endereco: number) => {
      setIsLoading(true);
      setError(null);

      const id_usuario = Number(localStorage.getItem('id_usuario'));
      const token = localStorage.getItem('auth_token');

      if (!id_usuario || !token) {
        setError('Usuário não autenticado.');
        setIsLoading(false);
        return { success: false };
      }

      try {
    const pedido = await createPedidoAPI(token, {
      id_usuario,
      id_endereco,
      valor_total: valorTotal,
      data: new Date().toISOString(),
    });

        const id_pedido: number = pedido.id_pedido;

        await Promise.all(
          itens.map((item) => {
            const id_produto = item.id_produto ?? item.produto?.id_produto;
            const preco_unitario = Number(item.preco_unitario ?? item.produto_preco ?? 0);

            if (!id_produto) throw new Error('Item sem produto vinculado.');

            return createItemPedidoAPI(token, {
              id_pedido,
              id_produto,
              quantidade: item.quantidade,
              preco_unitario,
            });
          })
        );

        // 3. Limpar o carrinho (remover cada item)
        await Promise.all(
          itens.map((item) => deleteItemCarrinhoAPI(item.id_item_carrinho, token))
        );

        setIsLoading(false);
        return { success: true, id_pedido };
      } catch (err: any) {
        setError(err.message || 'Erro ao finalizar pedido.');
        setIsLoading(false);
        return { success: false };
      }
    },
    []
  );

  return { execute, isLoading, error };
}