"use client";

import { useState } from "react";
import { loginAction } from "@/src/actions/auth";
import { Button } from "@/src/components/Button";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const result = await loginAction(formData);

    if (result.success && result.token) {
      localStorage.setItem("auth_token", result.token);

      if (result.usuario) {
          const userId = result.usuario.id_usuario || result.usuario.id;
          if (userId) {
              localStorage.setItem("id_usuario", userId.toString());
          }
      }

      window.location.href = "/";
    } else {
      setError(result.error || "Ocorreu um erro ao fazer login.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <form action={handleLogin} className="space-y-5">

        {error && (
          <p className="text-center font-medium text-red-600 animate-pulse">
            {error}
          </p>
        )}

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
          required
        />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
          required
        />

        <Button text={isLoading ? "ENTRANDO..." : "ENTRAR"} type="submit" />
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Não tem uma conta?{" "}
        <Link href="/cadastro" className="text-[#7929c8] font-bold hover:underline">
          Cadastre-se aqui
        </Link>
      </div>
    </>
  );
}