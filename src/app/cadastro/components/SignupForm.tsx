"use client";

import { useState } from "react";
import { Button } from "@/src/components/Button";
import { signupAction } from "@/src/actions/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/Input";

export const SignupForm = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSignup(formData: FormData) {
        setError(null);

        if (formData.get("senha") !== formData.get("confirmarSenha")) {
            setError("As senhas não coincidem.");
            return;
        }

        const result = await signupAction(formData);

        if (result.success) {
            alert("Conta criada com sucesso! Faça login para continuar.");
            router.push("/login");
        } else {
            setError(result.error || "Erro ao criar conta.");
        }
    }

    return (
        <form action={handleSignup} className="space-y-5">
            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse text-sm">
                    {error}
                </p>
            )}

            <Input name="nome" type="text" placeholder="Nome Completo" required={true}/>
            <Input name="email" type="email" placeholder="E-mail" required={true}/>


            <div className="flex gap-4">
                <Input name="cpf" type="text" placeholder="CPF" required={true}/>
                <Input name="telefone" type="tel" placeholder="Telefone" required={true}/>
            </div>
            
            <Input name="senha" type="password" placeholder="Criar Senha" required={true}/>
            <Input name="confirmarSenha" type="password" placeholder="Repetir Senha" required={true}/>


            <Button
                text="Cadastrar Agora"
                type="submit"
            />
        </form>
    );
};