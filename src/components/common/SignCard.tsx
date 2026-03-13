import { Icon } from "@/src/components/ui/Icon";
import Link from "next/link";
import { ReactNode } from "react";

interface SignCardProps {
  title: string;
  children: ReactNode; // Aqui entra o formulário (Login ou Cadastro)
  backHref?: string;
}

export const SignCard = ({ title, children, backHref = "/" }: SignCardProps) => {
  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/img/login-background.png')" }}
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-[40px] bg-white shadow-2xl">
        
        {/* Botão Voltar Dinâmico */}
        <Link 
          href={backHref} 
          className="absolute left-6 top-4 z-50 flex items-center gap-2 text-white transition-all hover:opacity-80"
        >
          <div className="flex h-5 w-5 items-center justify-center">
             <Icon 
               name="faRightFromBracket" 
               className="rotate-180 text-white" 
               size="lg"
             />
          </div>
          <span className="text-md font-medium">Voltar</span>
        </Link>

        {/* Cabeçalho Roxo (O que não muda) */}
        <div className="flex flex-col items-center bg-linear-to-r from-[#5714d7] to-[#7929c8] pb-5 pt-16">
          <img src="/img/logo-mcecelulares.png" alt="Logo" className="h-20 w-auto object-contain" />
          <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
        </div>

        {/* Conteúdo Dinâmico (Inputs e Botões) */}
        <div className="px-10 pb-7 pt-12">
          {children}
        </div>
      </div>
    </div>
  );
};