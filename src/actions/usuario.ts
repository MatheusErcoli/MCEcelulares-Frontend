import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getUsuarioAPI(
  token: string,
  body: { id_usuario: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/usuario/${body.id_usuario}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return {
      success: true,
      usuario: data
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function getUsuariosAPI(
  token: string,
  params: { page?: number; limit?: number } = {}
) {
  try {
    const { page = 1, limit = 20 } = params;
    const url = `${API_URL}/usuario?page=${page}&limit=${limit}`;

    const response = await fetchWithAuth(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return {
      success: true,
      usuarios: data.data as UsuarioType[],
      totalPages: data.totalPages as number,
      total: data.total as number,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function updateUsuarioAPI(
  token: string,
  body: {
    id_usuario: number;
    dados: { nome?: string; telefone?: string };
  }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/usuario/${body.id_usuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body.dados)
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