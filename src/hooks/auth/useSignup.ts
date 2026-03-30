import { signupAPI } from "@/src/actions/auth";
import { useState } from "react";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const result = await signupAPI(formData);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return false;
    }

    return true;
  };

  return { signup, loading, error };
}