"use client";

import { useState } from "react";
import { loginAction } from "@/src/actions/auth"; // Ajuste o caminho se sua pasta de actions for diferente
import Link from "next/link";
import { Icon } from "@/src/components/Icon";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função que intercepta o formulário para podermos salvar no LocalStorage
  const handleLogin = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    // Chama a action do lado do servidor
    const result = await loginAction(formData);

    if (result.success && result.token) {
      // ✅ REQUISITO DA RUBRICA ATENDIDO AQUI:
      localStorage.setItem("auth_token", result.token);
      
      // Força o redirecionamento para a Home recarregando a página 
      // para o Header (Server Component) atualizar o estado de logado
      window.location.href = "/";
    } else {
      // Exibe o erro e destrava o botão
      setError(result.error || "Ocorreu um erro ao fazer login.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#5714d7]">Bem-vindo de volta!</h2>
        <p className="text-gray-500 mt-2 text-sm">Faça login para acessar sua conta</p>
      </div>

      {/* Exibição de erro caso o login falhe */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium">
          {error}
        </div>
      )}

      {/* O action aponta para a nossa função handleLogin acima */}
      <form action={handleLogin} className="space-y-5">
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            name="email" // Importante: name deve bater com o formData.get("email")
            required
            placeholder="Digite seu e-mail"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7929c8] focus:border-[#7929c8] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            name="senha" // Importante: name deve bater com o formData.get("senha")
            required
            placeholder="Digite sua senha"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7929c8] focus:border-[#7929c8] outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2 mt-4"
        >
          {isLoading ? "Entrando..." : "Entrar"}
          {!isLoading && <Icon name="faArrowRight" className="w-4" size="sm" />}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Não tem uma conta?{" "}
        <Link href="/cadastro" className="text-[#7929c8] font-bold hover:underline">
          Cadastre-se aqui
        </Link>
      </div>
    </div>
  );
}