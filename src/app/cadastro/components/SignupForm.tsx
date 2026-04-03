"use client";

import { useState } from "react";
import { Button } from "@/src/components/Button";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/InputGray";
import { useSignup } from "@/src/hooks/auth/useSignup";

export const SignupForm = () => {
    const [validationError, setValidationError] = useState<string | null>(null);
    const router = useRouter();

    const { signup, loading, error: apiError } = useSignup();

    async function handleSignup(formData: FormData) {
        setValidationError(null);

        if (formData.get("senha") !== formData.get("confirmarSenha")) {
            setValidationError("As senhas não coincidem.");
            return;
        }

        const success = await signup(formData);

        if (success) {
            alert("Conta criada com sucesso! Faça login para continuar.");
            router.push("/login");
        }
    }

    const displayError = validationError || apiError;

    return (
        <form action={handleSignup} className="space-y-5">
            {displayError && (
                <p className="text-center font-medium text-red-600 animate-pulse text-sm">
                    {displayError}
                </p>
            )}

            <Input name="nome" type="text" placeholder="Nome Completo" required={true} minLength={3} maxLength={100} />
            <Input name="email" type="email" placeholder="E-mail" required={true} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Digite um e-mail válido (ex: usuario@dominio.com)" />

            <div className="flex gap-4">
                <Input name="cpf" type="text" placeholder="CPF" required={true} pattern="(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})" title="CPF deve ter 11 números ou o formato 000.000.000-00" />
                <Input name="telefone" type="tel" placeholder="Telefone" required={true} minLength={10} maxLength={15} />
            </div>

            <Input name="senha" type="password" placeholder="Criar Senha" required={true} minLength={8} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}" title="A senha deve ter no mínimo 8 caracteres, incluir letra maiúscula, minúscula, número e caractere especial." />
            <Input name="confirmarSenha" type="password" placeholder="Repetir Senha" required={true} />

            <Button
                text={loading ? "Cadastrando..." : "Cadastrar Agora"}
                type="submit"
                disabled={loading}
            />
        </form>
    );
};