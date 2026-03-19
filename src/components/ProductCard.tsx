import { useRouter } from "next/navigation";
import { Button } from "./Button";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
}

export const ProductCard = ({ name, price, image }: ProductCardProps) => {
    const router = useRouter();

    const irParaCarrinho = () => {
        router.push("/carrinho");
    };

    return (
        <div className="w-full max-w-[280px] p-[1px] m-[10px] bg-gradient-to-r from-[#5714d7] to-[#7929c8] rounded-3xl  transition-transform hover:scale-105">
            
            <div className="bg-white rounded-[23px] overflow-hidden flex flex-col h-full">
                
                <div className="bg-[#E5E7EB] p-5 flex items-center justify-center relative aspect-[3/2] bg-product-pattern bg-repeat bg-center">
                    <img
                        src={image}
                        alt={name}
                        className="object-contain max-h-full max-w-[200px]"
                    />
                </div>

                <div className="bg-white p-4 flex flex-col items-center">
                    <h3 className="text-xl font-bold text-black text-center mt-2 leading-tight">
                        {name}
                    </h3>

                    <p className="text-lg font-semibold bg-gradient-to-r from-[#5714d7] to-[#7929c8] bg-clip-text text-transparent mt-1 mb-4">
                        {price}
                    </p>

                    <Button
                        text="Adicionar"
                        icon="faCartShopping"
                        onClick={irParaCarrinho}
                    />
                </div>
            </div>
        </div>
    );
};