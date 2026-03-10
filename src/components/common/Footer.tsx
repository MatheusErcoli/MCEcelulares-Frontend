import Link from 'next/link';
import { Icon } from '../ui/Icon';

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#5714d7] to-[#7929c8] text-white px-20 py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="flex gap-4 items-center">
                    <Link href="#" className="bg-white p-2 rounded-full hover:scale-110 transition-transform">
                        <Icon name="faWhatsapp" className="text-[#25D366] text-xl w-6 h-6" />
                    </Link>
                    <Link href="#" className="bg-white p-2 rounded-full hover:scale-110 transition-transform">
                        <Icon name="faInstagram" className="text-[#E4405F] text-xl w-6 h-6" />
                    </Link>
                </div>

                <div className="flex flex-col items-center text-center">
                    <img
                        src="/img/logo-mcecelulares.png"
                        alt="Logo MCe Celulares"
                        className="h-12 w-auto mb-2 object-contain"
                    />
                    <p className="text-sm">
                        © {new Date().getFullYear()} Todos os direitos reservados
                    </p>
                </div>

                <div className="text-right flex flex-col items-end text-sm">
                    <p className="font-semibold uppercase">Rua Minas Gerais</p>
                    <p>Centro, Corbélia - PR</p>
                    <Link
                        href="tel:45999457149"
                        className="mt-2 decoration-1 underline-offset-4 hover:text-gray-200"
                    >
                        (45) 99945-7149
                    </Link>
                </div>

            </div>
        </footer>
    );
};