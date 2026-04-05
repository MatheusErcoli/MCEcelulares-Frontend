import { fetchWithAuth } from "../lib/fetchWithAuth";

export async function loginAPI(
  body:{formData: FormData}
) {
  const email = body.formData.get("email");
  const senha = body.formData.get("senha");

  try {
    const response = await fetchWithAuth("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,senha}),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      token: data.token,
      id_usuario: data.id_usuario,
      message: "Login feito com sucesso" 
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}

export async function signupAPI(
  body:{formData: FormData}
) {
  
  const nome = body.formData.get("nome");
  const email = body.formData.get("email");
  const senha = body.formData.get("senha");
  const cpf = body.formData.get("cpf");
  const telefone = body.formData.get("telefone");

  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nome,email,senha,cpf,telefone}),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return { success: true, message: "Usuário cadastrado com sucesso" };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}