import { loginAPI } from "@/src/actions/auth";
import { useCallback, useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (formData: FormData) => {

    setLoading(true);
    setError(null);
    try {
      const data = await loginAPI({formData});
      
      if (!data.success) throw new Error(data.error);

      return {
        succes:true,
        token: data.token,
        id_usuario: data.id_usuario,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao fazer login");
      return { success: false };
    } finally {
      setLoading(false);
    }
  },[])

  return { login, loading, error };
}