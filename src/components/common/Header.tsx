import Link from "next/link";
import { Icon } from "../ui/Icon";
import Image from "next/image";

export const Header = () => {
    // Simulação de estado de login. 
    // Em um cenário real, isso viria de um Contexto ou Hook de Autenticação.
    const isLogged = false; 

    return (
        <header className="bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white px-6 py-4 flex items-center justify-between">

            <div className="flex-1">
                <Link href="/" className="text-xl font-bold italic">
                    <Image src="/img/logo-mcecelulares.png" alt="Logo" width={150} height={16} priority />
                </Link>
            </div>

            <nav className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    Início <Icon name="faHouse" className="w-4" size="lg"/>
                </Link>
                <Link href="/produtos" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    Produtos <Icon name="faBox" className="w-4" size="lg"/>
                </Link>
                <Link href="/carrinho" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    Carrinho <Icon name="faCartShopping" className="w-4" size="lg"/>
                </Link>
                <Link href="/contato" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    Contato <Icon name="faPhone" className="w-4" size="lg"/>
                </Link>
            </nav>

            <div className="flex-1 flex justify-end items-center gap-4">
                {isLogged ? (
                    <Link href="/perfil" className="flex items-center gap-2 transition-transform hover:scale-105">
                        Perfil <Icon name="faCircleUser" className="w-4" size="2xl"/>
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        {/* Botão Branco com Fonte Roxa */}
                        <Link 
                            href="/login" 
                            className=" border-2 border-white bg-white text-[#7929c8] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#7929c8] hover:text-white transition-colors"
                        >
                            Entrar
                        </Link>

                        {/* Botão Roxo com Contorno e Fonte Branca */}
                        <Link 
                            href="/cadastro" 
                            className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all"
                        >
                            Cadastrar
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}