"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignup } from "@/src/hooks/auth/useSignup";
import { Button } from "@/src/components/Button";
import { InputGray } from "@/src/components/InputGray";

export const SignupForm = () => {
  const { execute: signup, loading, error: apiError } = useSignup();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const router = useRouter();

  const senhasNaoCoincidem = confirmarSenha.length > 0 && senha !== confirmarSenha;

  const handleSignup = async (formData: FormData) => {
    if (senhasNaoCoincidem) return;

    const result = await signup(formData);
    if (result.success) router.push("/login");
  };

  return (
    <form action={handleSignup} className="space-y-5">
      {apiError && (
        <p className="text-center font-medium text-red-600 animate-pulse text-sm whitespace-pre-line">
          {apiError}
        </p>
      )}

      <InputGray name="nome" type="text" placeholder="Nome Completo" required={true} minLength={3} maxLength={100} />
      <InputGray name="email" type="email" placeholder="E-mail" required={true} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Digite um e-mail válido (ex: usuario@dominio.com)" />

      <div className="flex gap-4">
        <InputGray name="cpf" type="text" placeholder="CPF" required={true} pattern="(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})" title="CPF deve ter 11 números ou o formato 000.000.000-00" />
        <InputGray name="telefone" type="tel" placeholder="Telefone" required={true} minLength={10} maxLength={15} />
      </div>

      <InputGray
        name="senha"
        type="password"
        placeholder="Criar Senha"
        required={true}
        minLength={8}
        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
        title="A senha deve ter no mínimo 8 caracteres, incluir letra maiúscula, minúscula, número e caractere especial."
        onChange={(e) => setSenha(e.target.value)}
      />

      <div className="flex flex-col gap-1">
        <InputGray
          name="confirmarSenha"
          type="password"
          placeholder="Repetir Senha"
          required={true}
          minLength={8}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        {senhasNaoCoincidem && (
          <p className="text-red-600 text-sm font-medium animate-pulse px-2">
            As senhas não coincidem.
          </p>
        )}
      </div>

      <Button
        text={loading ? "Cadastrando..." : "Cadastrar Agora"}
        type="submit"
        disabled={loading || senhasNaoCoincidem}
      />

      <div className="text-center">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="font-bold text-[#5714d7] hover:underline">
            Faça Login
          </Link>
        </p>
      </div>
    </form>
  );
};