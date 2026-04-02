import { loginAPI } from "@/src/actions/auth";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const result = await loginAPI(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return null;
    }

    return {
      token: result.token,
      usuario: result.usuario as UsuarioType,
    };
  };

  return { login, loading, error };
}