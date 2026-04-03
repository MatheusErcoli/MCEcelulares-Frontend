import { useState, useCallback } from 'react';
import { getPedidosAPI } from '@/src/actions/pedido';

interface ItemPedido {
  id_item: number;
  id_produto: number;
  quantidade: number;
  preco_unitario: number;
}

interface PedidoType {
  id_pedido: number;
  id_usuario: number;
  valor_total: number;
  status: string;
  data: string;
  endereco: EnderecoType | null;
  itens: ItemPedido[];
}

export function useGetPedidos() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<PedidoType[]>([]);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('auth_token');
    const id_usuario = Number(localStorage.getItem('id_usuario'));

    if (!token || !id_usuario) {
      setError('Usuário não autenticado.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await getPedidosAPI(token);
      const todos: PedidoType[] = res.data ?? [];
      setPedidos(todos.filter((p) => p.id_usuario === id_usuario));
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar pedidos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { execute, isLoading, error, pedidos };
}