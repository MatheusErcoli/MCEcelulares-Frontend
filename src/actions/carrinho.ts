import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000'; 

export async function createCarrinhoAPI(id_usuario: number, token: string) {
  const response = await fetchWithAuth(`${API_URL}/carrinho`, {
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

export async function getCarrinhoAPI(id_usuario: number, token: string) {
  const response = await fetchWithAuth(`${API_URL}/carrinho/${id_usuario}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar carrinho');
  return data;
}

export async function createItemCarrinhoAPI(id_carrinho: number, id_produto: number, preco_unitario: number, token: string) {
  const response = await fetchWithAuth(`${API_URL}/itemcarrinho`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id_carrinho, id_produto, preco_unitario })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao adicionar item');
  return data;
}

export async function updateItemCarrinhoAPI(id_item_carrinho: number, quantidade: number, token: string) {
  const response = await fetchWithAuth(`${API_URL}/itemcarrinho/${id_item_carrinho}`, {
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

export async function deleteItemCarrinhoAPI(id_item_carrinho: number, token: string) {
  const response = await fetchWithAuth(`${API_URL}/itemcarrinho/${id_item_carrinho}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 204) return;
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao deletar item');
  return data;
}