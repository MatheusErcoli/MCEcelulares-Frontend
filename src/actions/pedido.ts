import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createPedidoAPI(
  token: string,
  body: { id_usuario: number; id_endereco: number; valor_total: number }
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
    return {
      success: true,
      message: "Pedido criado com sucesso"
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function getPedidosAPI(token: string) {
  try {
  const response = await fetchWithAuth(`${API_URL}/pedido?limit=50`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Erro ao buscar pedidos');
  
    return {
      success: true,
      pedidos: data,
      message: "Pedidos encontrados com sucesso"
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}