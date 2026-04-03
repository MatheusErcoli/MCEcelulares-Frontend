const API_URL = 'http://localhost:3000';

export async function createPedidoAPI(
  token: string,
  body: { id_usuario: number; id_endereco: number; valor_total: number; data?: string }
) {
  const response = await fetch(`${API_URL}/pedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao criar pedido');
  return data;
}

export async function createItemPedidoAPI(
  token: string,
  body: { id_pedido: number; id_produto: number; quantidade: number; preco_unitario: number }
) {
  const response = await fetch(`${API_URL}/itempedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao criar item do pedido');
  return data;
}

export async function getPedidosAPI(token: string) {
  const response = await fetch(`${API_URL}/pedido?limit=50`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar pedidos');
  return data;
}