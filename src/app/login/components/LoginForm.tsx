"use client";

import { useState } from "react";
import { loginAction } from "@/src/actions/auth";
import { Button } from "@/src/components/Button";
import Link from "next/link";
import { Input } from "@/src/components/Input";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    setError(null);

    const result = await loginAction(formData);

    if (result.success && result.token) {
      localStorage.setItem("auth_token", result.token);

      if (result.usuario) {
          const userId = result.usuario.id_usuario;
          if (userId) {
              localStorage.setItem("id_usuario", userId.toString());
          }
      }

      window.location.href = "/";
    } else {
      setError(result.error);
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

        <Input name="email" type="email" placeholder="E-mail" required={true}/>
        <Input name="senha" type="password" placeholder="Senha" required={true}/>

        <Button text="Entrar" type="submit" />
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