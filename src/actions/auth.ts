export async function loginAPI(formData: FormData) {
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
      return { success: false, error: data.message};
    }

    return { 
      success: true, 
      token: data.token, 
      usuario: data.usuario as User
    }; 
  } catch (error) {
    return { success: false, error: "Servidor indisponível no momento." };
  }
}

export async function signupAPI(formData: FormData) {
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
      return { success: false, error: data.message};
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Servidor indisponível no momento." };
  }
}