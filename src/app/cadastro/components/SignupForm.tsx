"use client";

import { useState } from "react";
import { Button } from "@/src/components/Button";
import { signupAction } from "@/src/actions/auth";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignup(formData: FormData) {
        setError(null);
        setLoading(true);

        if (formData.get("senha") !== formData.get("confirmarSenha")) {
            setError("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        const result = await signupAction(formData);

        if (result.success) {
            alert("Conta criada com sucesso! Faça login para continuar.");
            router.push("/login");
        } else {
            setError(result.error || "Erro ao criar conta.");
            setLoading(false);
        }
    }

    return (
        <form action={handleSignup} className="space-y-5">
            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse text-sm">
                    {error}
                </p>
            )}

            <input
                name="nome"
                type="text"
                placeholder="Nome Completo"
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />

            <input
                name="email"
                type="email"
                placeholder="E-mail"
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />

            <div className="flex gap-4">
                <input
                    name="cpf"
                    type="text"
                    placeholder="CPF"
                    className="w-1/2 rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6211f1]/50"
                    required
                />
                <input
                    name="telefone"
                    type="tel"
                    placeholder="Telefone"
                    className="w-1/2 rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6211f1]/50"
                    required
                />
            </div>

            <input
                name="senha"
                type="password"
                placeholder="Criar Senha"
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />

            <input
                name="confirmarSenha"
                type="password"
                placeholder="Repetir Senha"
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />

            <Button
                text={loading ? "Criando conta..." : "Cadastrar Agora"}
                type="submit"
            />
        </form>
    );
};