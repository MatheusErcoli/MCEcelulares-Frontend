import { loginAPI } from "@/src/actions/auth";
import { useAuth } from "@/src/contexts/AuthContext";
import { useCallback, useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const execute = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const email = formData.get("email") as string;
      const senha = formData.get("senha") as string;

      const data = await loginAPI({ email, senha });

      if (!data.success) throw new Error(data.error);

      login(data.token!, data.id_usuario!, data.nome!);

      return { success: true };
    } catch (error) {
      setError((error as Error).message || "Erro ao fazer login");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [login]);

  return { execute, loading, error };
};