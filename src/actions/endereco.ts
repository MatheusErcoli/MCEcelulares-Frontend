import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createEnderecoAPI(
  token: string,
  body: { id_usuario: number, formData: FormData }
) {
  try {
    const endereco = body.formData.get("endereco");
    const numero = body.formData.get("numero");
    const complemento = body.formData.get("complemento");
    const bairro = body.formData.get("bairro");
    const cidade = body.formData.get("cidade");
    const estado = body.formData.get("estado");
    const cep = body.formData.get("cep");

    const response = await fetchWithAuth(`${API_URL}/endereco`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ endereco, numero, complemento, bairro, cidade, estado, cep })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      categorias: data,
      message: "Endereço cadastrado com sucesso"
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function updateEnderecoAPI(
  token: string,
  body: { id_endereco: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/endereco/${body.id_endereco}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Erro ao definir endereço principal');

    return {
      success: true,
      endereco: data,
      message: "Endereço "
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function deleteEnderecoAPI(
  token: string,
  body: { id_endereco: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/endereco/${body.id_endereco}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = response.status === 204 ? null : await response.json();
    
    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      message: "Endereço excluído com sucesso"
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}