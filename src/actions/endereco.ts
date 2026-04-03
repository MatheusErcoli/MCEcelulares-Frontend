import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createEnderecoAPI(id_usuario: number, token: string, formData: FormData) {
  const endereco = formData.get("endereco");
  const numero = formData.get("numero");
  const complemento = formData.get("complemento");
  const bairro = formData.get("bairro");
  const cidade = formData.get("cidade");
  const estado = formData.get("estado");
  const cep = formData.get("cep");

  const response = await fetchWithAuth(`${API_URL}/endereco`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id_usuario, endereco, numero, complemento, bairro, cidade, estado, cep })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao cadastrar endereço');
  return data;
}

export async function setAtivoEnderecoAPI(id_endereco: number, token: string) {
  const response = await fetch(`${API_URL}/endereco/${id_endereco}/ativo`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao definir endereço principal');
  return data;
}

export async function deleteEnderecoAPI(id_endereco: number, token: string) {
  const response = await fetch(`${API_URL}/endereco/${id_endereco}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 204) return;
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao deletar endereço');
  return data;
}