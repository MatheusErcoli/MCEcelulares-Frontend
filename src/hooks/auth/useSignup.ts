import { signupAPI } from "@/src/actions/auth";
import { useCallback, useState } from "react";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signupAPI({
        nome: formData.get("nome") as string,
        email: formData.get("email") as string,
        senha: formData.get("senha") as string,
        cpf: formData.get("cpf") as string,
        telefone: formData.get("telefone") as string,
      });

      if (!data.success) throw new Error(data.error);

      return { success: true };
    } catch (error) {
      setError((error as Error).message || "Erro ao cadastrar usuário");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}