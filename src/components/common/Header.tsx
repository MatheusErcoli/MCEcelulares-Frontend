import Link from "next/link";
import { Icon } from "../ui/Icon";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="bg-linear-to-r from-[#5714d7] to-[#7929c8] text-white px-6 py-4 flex items-center justify-between">

            <div className="flex-1">
                <Link href="/" className="text-xl font-bold italic"><Image src="/img/logo-mcecelulares.png" alt="w-auto" width={150} height={16}/></Link>
            </div>

            <nav className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                    Início <Icon name="faHouse" className="w-4" size="lg"/>
                </Link>
                <Link href="produtos" className="flex items-center gap-2">
                    Produtos <Icon name="faBox" className="w-4" size="lg"/>
                </Link>
                <Link href="carrinho" className="flex items-center gap-2">
                    Carrinho <Icon name="faCartShopping" className="w-4" size="lg"/>
                </Link>
                <Link href="contato" className="flex items-center gap-2">
                    Contato <Icon name="faPhone" className="w-4" size="lg"/>
                </Link>
            </nav>

            <div className="flex-1 flex justify-end">
                <Link href="login" className="flex items-center gap-2 transition-transform">
                    Perfil <Icon name="faCircleUser" className="w-4" size="2xl"/>
                </Link>
            </div>
        </header>
    );
}