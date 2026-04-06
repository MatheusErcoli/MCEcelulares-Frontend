const API_URL = 'http://localhost:3000';

export async function getProdutoAPI(
  body: { id_produto: number }
) {
  try {
    const response = await fetch(`${API_URL}/produto/${body.id_produto}`);

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      produto: data
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function getProdutosAPI(
  body: { page?: number, limit?: number, id_categoria?: string, id_marca?: string, destaque?: boolean }
) {
  try {
    const response = await fetch(`${API_URL}/produto?page=${body.page}&limit=${body.limit}&id_categoria=${body.id_categoria}&id_marca=${body.id_marca}&destaque=${body.destaque}`);

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    return {
      success: true,
      produtos: data.data,
      total: data.total,
      totalPages: data.totalPages
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}