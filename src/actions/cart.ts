const API_URL = 'http://localhost:3000'; 

export async function initCartAPI(id_usuario: number, token: string) {
  const response = await fetch(`${API_URL}/carrinho`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id_usuario })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao inicializar');
  return data;
}

export async function getCompleteCartAPI(id_usuario: number, token: string) {
  const response = await fetch(`${API_URL}/carrinho/${id_usuario}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar carrinho');
  return data;
}

export async function addItemAPI(id_usuario: number, id_produto: number, preco_unitario: number, token: string) {
  const response = await fetch(`${API_URL}/carrinho/item`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id_usuario, id_produto, preco_unitario })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao adicionar item');
  return data;
}

export async function updateItemQuantityAPI(id_item_carrinho: number, quantidade: number, token: string) {
  const response = await fetch(`${API_URL}/item-carrinho/${id_item_carrinho}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ quantidade })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao atualizar quantidade');
  return data;
}

export async function deleteItemAPI(id_item_carrinho: number, token: string) {
  const response = await fetch(`${API_URL}/item-carrinho/${id_item_carrinho}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao deletar item');
  return data;
}