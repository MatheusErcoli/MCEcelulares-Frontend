"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/src/components/ui/Button";

export const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); 
        
        console.log("Dados capturados:", { name, email, password, confirmPassword });

        setIsSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />
            
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />

            <input
                type="password"
                placeholder="Criar Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />

            <input
                type="password"
                placeholder="Repetir Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
                required
            />
            
            <Button 
                text="CADASTRAR"
            />

            {isSuccess && (
                <p className="text-center font-medium text-green-600 animate-bounce">
                    Cadastro realizado com sucesso!
                </p>
            )}
        </form>
    );
};