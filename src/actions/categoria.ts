const API_URL = 'http://localhost:3000';

export async function getCategoriasAPI() {
  const response = await fetch(`${API_URL}/categoria`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar categorias');
  return data;
}