import { fetchWithAuth } from "../lib/fetchWithAuth";

export async function loginAPI(body: { email: string; senha: string }) {
  try {
    const response = await fetchWithAuth("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      id_usuario: data.id_usuario as number,
      nome: data.nome,
      token: data.token as string,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento.",
    };
  }
}

export async function signupAPI(body: {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}) {
  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento.",
    };
  }
}