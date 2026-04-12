import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getMarcasAPI(body: { id_categoria?: number, ativo?: boolean }) {
  try {
    const params = new URLSearchParams();
    if (body.id_categoria) params.set('id_categoria', String(body.id_categoria));
    if (body.ativo !== undefined) params.set('ativo', String(body.ativo));

    const response = await fetch(`${API_URL}/marca?${params}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    return { success: true, marcas: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." }
  }
}

export async function createMarcaAPI(
  token: string,
  body: { nome: string }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/marca`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, marca: data };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function updateMarcaAPI(
  token: string,
  id_marca: number,
  body: { nome: string; ativo?: boolean }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/marca/${id_marca}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, marca: data };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}