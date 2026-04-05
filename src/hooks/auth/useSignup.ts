import { signupAPI } from "@/src/actions/auth";
import { useCallback, useState } from "react";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signupAPI({formData});

      if (!data.success) throw new Error(data.error);

      return {
        succes:true,
        message: data.message
      };
    } catch (error) {
      setError((error as Error).message || "Erro ao cadastrar usuário");
      return { success: false };
    } finally {
      setLoading(false);
    }
  },[])

  return { signup, loading, error };
}