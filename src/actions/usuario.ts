const API_URL = 'http://localhost:3000';

export async function getUsuarioAPI(id_usuario: number, token: string) {
  const response = await fetch(`${API_URL}/usuario/${id_usuario}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar usuário');
  return data;
}