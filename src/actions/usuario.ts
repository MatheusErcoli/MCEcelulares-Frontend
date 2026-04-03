import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getUsuarioAPI(id_usuario: number, token: string) {
  const response = await fetchWithAuth(`${API_URL}/usuario/${id_usuario}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar usuário');
  return data;
}

export async function updateUsuarioAPI(id_usuario: number, dados: { nome?: string; telefone?: string }, token: string) {
  const response = await fetch(`${API_URL}/usuario/${id_usuario}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(dados)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao atualizar usuário');
  return data;
}