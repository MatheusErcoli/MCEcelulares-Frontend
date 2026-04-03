const API_URL = 'http://localhost:3000';

export async function getProdutoAPI(id_produto: number) {
  const response = await fetch(`${API_URL}/produto/${id_produto}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar produtos paginados');
  return data;
}

export async function getProdutosAPI(page?: number, limit?: number, id_categoria?: string, id_marca?: string, destaque?: boolean) {
  const response = await fetch(`${API_URL}/produto?page=${page}&limit=${limit}&id_categoria=${id_categoria}&id_marca=${id_marca}&destaque=${destaque}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar produtos paginados');
  return data;
}