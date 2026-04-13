import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createPedidoAPI(
  token: string,
  body: { id_endereco: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/pedido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}

export async function getPedidosAPI(token: string, id_usuario: number, page: number = 1) {
  try {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('id_usuario', String(id_usuario));

    const response = await fetchWithAuth(`${API_URL}/pedido?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      pedidos: data.data,
      total: data.total as number,
      totalPages: data.totalPages as number,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}

export async function getPedidosAdmAPI(token: string, params: { page?: number; limit?: number; status?: string } = {}) {
  try {
    const { page = 1, limit = 20, status = '' } = params;

    const urlParams = new URLSearchParams();
    urlParams.set('limit', String(limit));
    urlParams.set('page', String(page));
    if (status) urlParams.set('status', status);

    const response = await fetchWithAuth(`${API_URL}/pedido?${urlParams}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return {
      success: true,
      pedidos: data.data as PedidoType[],
      total: data.total as number,
      totalPages: data.totalPages as number,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'Servidor indisponível no momento.',
    };
  }
}

export async function updatePedidoStatusAPI(
  token: string,
  id: number,
  status: string
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/pedido/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Erro ao atualizar status.",
    };
  }
}