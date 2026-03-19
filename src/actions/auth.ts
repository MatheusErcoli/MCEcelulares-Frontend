"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const senha = formData.get("senha");

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Falha no login" };
    }

    const cookieStore = await cookies();
    
    // Mantemos o cookie para o Header continuar funcionando via Servidor
    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    // Retornamos o token explicitamente para o cliente salvar no LocalStorage
    return { success: true, token: data.token }; 
  } catch (error) {
    return { success: false, error: "Servidor indisponível no momento." };
  }
}

export async function signupAction(formData: FormData) {
  const nome = formData.get("nome");
  const email = formData.get("email");
  const senha = formData.get("senha");
  const cpf = formData.get("cpf");
  const telefone = formData.get("telefone");

  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        senha,
        cpf,
        telefone,
        ativo: true,
        admin: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "Erro ao realizar cadastro" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Falha na conexão com o servidor." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  // O redirecionamento será feito no cliente para podermos limpar o LocalStorage também
}