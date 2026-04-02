const API_URL = 'http://localhost:3000';

export async function getMarcasAPI(id_categoria?: number) {
  const response = await fetch(`${API_URL}/marca?id_categoria=${id_categoria}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar marcas');
  return data;
}