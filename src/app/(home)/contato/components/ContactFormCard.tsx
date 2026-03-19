// src/components/ContactPage/ContactFormCard.tsx
"use client";

import { useRef } from "react"; // Adicionado para limpar o form
import { sendEmailAction } from "@/src/actions/sendEmail";
import { Icon } from "@/src/components/Icon";
import { Button } from "@/src/components/Button"; // Importando seu componente

export const ContactFormCard = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const result = await sendEmailAction(formData);
        if (result.success) {
            alert("Mensagem enviada com sucesso!");
            formRef.current?.reset(); // Limpa o formulário após o sucesso
        } else {
            alert("Erro: " + (result.error || "Ocorreu um erro desconhecido"));
        }
    };

    // Classe padrão para os inputs igual ao FormLogin
    const inputStyle = "w-full rounded-full bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none";

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="nome" required placeholder="Nome Completo" className={inputStyle} />
                <input type="tel" name="telefone" required placeholder="Telefone: (99) 99999-9999" className={inputStyle} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" name="email" required placeholder="Seu melhor e-mail" className={inputStyle} />
                <input type="text" name="assunto" required placeholder="Assunto do contato" className={inputStyle} />
            </div>

            <div className="flex flex-col gap-2">
                <textarea
                    name="mensagem"
                    required
                    placeholder="Digite a sua mensagem..."
                    rows={4}
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                ></textarea>
            </div>

            {/* Utilizando o seu componente Button customizado */}
            <Button
                text="Enviar Mensagem"
                icon="faEnvelope"
            />
        </form>
    );
};