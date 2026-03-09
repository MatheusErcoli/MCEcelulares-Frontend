import Link from "next/link";
import { Icon } from "../ui/Icon";

export const Header = () => {
    return (
        <header className="bg-gradient-to-r from-[#5714d7] to-[#7929c8] text-white px-6 py-4 flex items-center justify-between">

            <div className="flex-1">
                <Link href="/" className="text-xl font-bold italic">LOGO</Link>
            </div>

            <nav className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                    Início <Icon name="faHouse" className="w-4" />
                </Link>
                <Link href="produtos" className="flex items-center gap-2">
                    Produtos <Icon name="faBox" className="w-4" />
                </Link>
                <Link href="carrinho" className="flex items-center gap-2">
                    Carrinho <Icon name="faCartShopping" className="w-4" />
                </Link>
                <Link href="contato" className="flex items-center gap-2">
                    Contato <Icon name="faPhone" className="w-4" />
                </Link>
            </nav>

            <div className="flex-1 flex justify-end">
                <Link href="perfil" className="flex items-center gap-2 transition-transform">
                    Perfil <Icon name="faCircleUser" className="w-4" />
                </Link>
            </div>
        </header>
    );
}