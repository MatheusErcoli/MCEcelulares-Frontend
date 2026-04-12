import { fetchWithAuth } from "../lib/fetchWithAuth";

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
  body: { page?: number, limit?: number, id_categoria?: string, id_marca?: string, destaque?: boolean, ativo?: boolean }
) {
  try {
    const params = new URLSearchParams();
    if (body.page !== undefined) params.set('page', String(body.page));
    if (body.limit !== undefined) params.set('limit', String(body.limit));
    if (body.id_categoria !== undefined) params.set('id_categoria', body.id_categoria);
    if (body.id_marca !== undefined) params.set('id_marca', body.id_marca);
    if (body.destaque !== undefined) params.set('destaque', String(body.destaque));
    if (body.ativo !== undefined) params.set('ativo', String(body.ativo));

    const response = await fetch(`${API_URL}/produto?${params}`);

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

export async function createProdutoAPI(
  token: string,
  body: {
    nome: string,
    descricao: string,
    preco: number,
    estoque: number,
    imagem: string,
    destaque: boolean,
    ativo: boolean,
    id_marca: number,
    id_categoria: number,
  }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/produto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

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

export async function updateProdutoAPI(
  token: string,
  id_produto: number,
  body: {
    nome?: string,
    descricao?: string,
    preco?: number,
    estoque?: number,
    imagem?: string,
    destaque?: boolean,
    ativo?: boolean,
    id_marca?: number,
    id_categoria?: number,
  }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/produto/${id_produto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

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