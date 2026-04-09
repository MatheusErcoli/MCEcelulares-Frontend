import { signupAPI } from "@/src/actions/auth";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";

export function useSignup() {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const data = await signupAPI({
        nome: formData.get("nome") as string,
        email: formData.get("email") as string,
        senha: formData.get("senha") as string,
        cpf: formData.get("cpf") as string,
        telefone: formData.get("telefone") as string,
      });

      if (!data.success) throw new Error(data.error);

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        text: "Agora faça login para utilizar sua conta.",
      });
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao entrar",
        text: (error as Error).message || "Erro ao fazer login",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading };
}