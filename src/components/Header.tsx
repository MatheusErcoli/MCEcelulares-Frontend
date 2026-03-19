import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { LogoutButton } from "./LogoutButton";
import { Icon } from "./Icon";

export const Header = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const isLogged = !!token; 

    return (
        <header className="bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
                <Link href="/" className="text-xl font-bold italic">
                    <Image src="/img/logo-mcecelulares.png" className="w-[180px] h-auto" alt="Logo" width={1365} height={503} priority />
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
                    <div className="flex items-center gap-2">
                        <Link href="/perfil" className="flex items-center gap-2 transition-transform group hover:text-gray-200">
                            <span className="text-sm font-medium">Minha Conta</span>
                            <Icon name="faCircleUser" className="w-5 text-white group-hover:text-gray-200" size="2xl"/>
                        </Link>

                        <LogoutButton />
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/login" 
                            className="border-2 border-white bg-white text-[#7929c8] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#7929c8] hover:text-white transition-colors"
                        >
                            Entrar
                        </Link>
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