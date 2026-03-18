// src/components/ContactPage/ContactPage.tsx
import { Icon } from "@/src/components/ui/Icon";
import Image from "next/image";

// Cores da marca do seu site (baseadas no gradiente do header)
const primaryPurple = "#5714d7";
const secondaryPurple = "#7929c8";

const Contato = () => {
    return (
        <main className="min-h-screen text-black p-6 md:p-12 lg:p-20">
            {/* Container Principal Centralizado */}
            <div className="max-w-7xl mx-auto">
                
                {/* Título Principal */}
                <h1 className="text-6xl font-extrabold text-black text-center mb-20 drop-shadow-lg">
                    Contato
                </h1>

                {/* Estrutura de Duas Colunas (Responsiva) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* COLUNA ESQUERDA: Formulário */}
                    <section className="bg-gray-200 text-zinc-950 p-10 rounded-3xl shadow-xl flex flex-col gap-6">
                        <h2 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
                           <Icon name="faPaperPlane" className="w-8" />
                           Mande sua mensagem!
                        </h2>
                        
                        {/* Linha 1: Nome e Telefone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-zinc-700">Nome:</label>
                                <input type="text" placeholder="Ex: Nome Completo" className="border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-[#7929c8] transition-shadow"/>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-zinc-700">Nº de Telefone:</label>
                                <input type="tel" placeholder="Ex: (99) 99999-9999" className="border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-[#7929c8] transition-shadow"/>
                            </div>
                        </div>

                        {/* Linha 2: E-mail e Assunto */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-zinc-700">E-mail:</label>
                                <input type="email" placeholder="Ex: nome@email.com" className="border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-[#7929c8] transition-shadow"/>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-zinc-700">Assunto:</label>
                                <input type="text" placeholder="Ex: Dúvida sobre Produto" className="border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-[#7929c8] transition-shadow"/>
                            </div>
                        </div>

                        {/* Mensagem e Avaliação */}
                        <div className="flex flex-col gap-4 mt-2 border-t-2 border-zinc-100 pt-6">
                            <label className="text-sm font-semibold text-zinc-700">O que você achou de nosso atendimento?</label>
                            <div className="flex items-center gap-2">
                                {/* Exemplo de estrelas de avaliação - Você pode usar um componente específico se tiver */}
                                <Icon name="faStar" className="w-6 text-[#7929c8]"/>
                                <Icon name="faStar" className="w-6 text-[#7929c8]"/>
                                <Icon name="faStar" className="w-6 text-[#7929c8]"/>
                                <Icon name="faStar" className="w-6 text-[#7929c8]"/>
                                <Icon name="faStar" className="w-6 text-[#7929c8]"/>
                            </div>
                            <textarea placeholder="Digite sua mensagem..." rows={5} className="border border-zinc-200 p-3 rounded-xl focus:ring-2 focus:ring-[#7929c8] transition-shadow mt-2"></textarea>
                        </div>

                        {/* Botão Enviar - Usando o gradiente da marca */}
                        <button className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white py-4 rounded-xl text-xl font-bold mt-4 hover:opacity-90 transition-opacity">
                            <Icon name="faEnvelope" className="w-6"/>
                            Enviar
                        </button>
                    </section>

                    {/* COLUNA DIREITA: Fale Direto Comigo */}
                    <aside className="p-8 flex flex-col items-center md:items-start text-center md:text-left gap-10">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
                                <Icon name="faComment" className="w-8"/>
                                Fale direto comigo!
                            </h2>
                            <p className="text-lg text-white/90">
                                Prefere um contato mais direto? Clique abaixo e fale comigo pelo WhatsApp ou Instagram.
                            </p>
                        </div>

                        {/* Botões de Ação */}
                        <div className="w-full flex flex-col gap-6">
                            {/* Botão WhatsApp - Estilo original da imagem mas com gradiente sutil */}
                            <a href="https://wa.me/seu_numero" target="_blank" rel="noopener noreferrer" className="w-full">
                                <button className="w-full flex items-center justify-center gap-4 bg-linear-to-r from-[#25D366] to-[#128C7E] text-white py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform">
                                    <Icon name="faWhatsapp" className="w-7"/>
                                    WhatsApp
                                </button>
                            </a>
                            
                            {/* Botão Instagram - Estilo original da imagem */}
                            <a href="https://instagram.com/seu_perfil" target="_blank" rel="noopener noreferrer" className="w-full">
                                <button className="w-full flex items-center justify-center gap-4 bg-linear-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform">
                                    <Icon name="faInstagram" className="w-7"/>
                                    Instagram
                                </button>
                            </a>
                        </div>
                    </aside>
                </div>

            </div>
        </main>
    );
};

export default Contato