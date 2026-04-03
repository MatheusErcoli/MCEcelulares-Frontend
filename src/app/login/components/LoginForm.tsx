"use client";

import { Button } from "@/src/components/Button";
import Link from "next/link";
import { useLogin } from "@/src/hooks/auth/useLogin";
import { InputGray } from "@/src/components/InputGray";

export default function LoginForm() {
  const { login, loading, error } = useLogin();

  const handleLogin = async (formData: FormData) => {
    const result = await login(formData);

    if (result && result.token) {
      localStorage.setItem("auth_token", result.token);

      if (result.usuario && result.usuario.id_usuario) {
        localStorage.setItem("id_usuario", result.usuario.id_usuario.toString());
      }

      window.location.href = "/";
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

        <InputGray
          name="email"
          type="email"
          placeholder="E-mail"
          required={true}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Digite um e-mail válido (ex: usuario@dominio.com)"
        />

        <InputGray
          name="senha"
          type="password"
          placeholder="Senha"
          required={true}
          minLength={8}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
          title="A senha deve ter no mínimo 8 caracteres, incluir letra maiúscula, minúscula, número e caractere especial."
        />

        <Button
          text={loading ? "Entrando..." : "Entrar"}
          type="submit"
          disabled={loading}
        />
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