import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getCategoriasAPI() {
  try {
    const response = await fetch(`${API_URL}/categoria`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      categorias: data
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function createCategoriaAPI(
  token: string,
  body: {
    nome: string,
    descricao: string
  }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/endereco`, {
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
      categoria: data
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}