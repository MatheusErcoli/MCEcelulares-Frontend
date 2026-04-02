const API_URL = 'http://localhost:3000';

export async function getMarcasAPI() {
  const response = await fetch(`${API_URL}/marca`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar marcas');
  return data;
}