"use client";

import { useRef, useState } from "react";
import { sendEmailAction } from "@/src/actions/sendEmail";
import { Icon } from "@/src/components/Icon";
import { Button } from "@/src/components/Button";
import { InputWhite } from "@/src/components/InputWhite";

export const ContactFormCard = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        const result = await sendEmailAction(formData);

        setLoading(false);

        if (result.success) {
            setSuccess(true);
            formRef.current?.reset();
        } else {
            setError(result.error || "Ocorreu um erro desconhecido.");
        }
    };

    return (
        <form
            ref={formRef}
            action={handleSubmit}
            className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6"
        >
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                <Icon name="faPaperPlane" className="w-8" />
                Mande a sua mensagem!
            </h2>

            {error && (
                <p className="text-center font-medium text-red-600 animate-pulse text-sm">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-center font-medium text-green-600 text-sm">
                    Mensagem enviada com sucesso!
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputWhite name="nome" type="text" placeholder="Nome Completo" required={true} minLength={3} maxLength={100} title="O nome deve ter entre 3 e 100 caracteres." />
                <InputWhite name="telefone" type="tel" placeholder="Telefone: (99) 99999-9999" required={true} pattern="\d{15}" title="O telefone deve ter 15 dígitos." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputWhite name="email" type="email" placeholder="E-mail" required={true} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="Digite um e-mail válido (ex: usuario@dominio.com)" />
                <InputWhite name="assunto" type="text" placeholder="Assunto" required={true} minLength={5} maxLength={30} title="O assunto deve ter entre 5 e 50 caracteres." />
            </div>

            <div className="flex flex-col gap-2">
                <textarea
                    name="mensagem"
                    required
                    placeholder="Digite a sua mensagem..."
                    rows={4}
                    minLength={50}
                    maxLength={200}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />
            </div>

            <Button
                text={loading ? "Enviando..." : "Enviar Mensagem"}
                icon="faEnvelope"
                type="submit"
                disabled={loading}
            />
        </form>
    );
};