// src/components/CartPage/CartItem.tsx
import { Icon } from "@/src/components/ui/Icon";
import Image from "next/image";

type CartItemProps = {
    id: number;         // O '?' torna opcional
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

export const CartItem = ({ 
    id, name, price, quantity = 1, imageUrl, 
    onIncrease, onDecrease, onRemove 
}: CartItemProps) => {
    
    // Formata o preço para R$
    const formattedPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            
            {/* Imagem do Produto e Detalhes */}
            <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-2xl p-2 relative">
                   {/* <Image 
                        src={imageUrl} 
                        alt={name} 
                        fill
                        className="object-contain p-2" 
                    /> */}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-zinc-900">{name}</h3>
                    <p className="text-lg text-zinc-600 font-medium">{formattedPrice}</p>
                </div>
            </div>

            {/* Controles de Quantidade e Remoção */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-full border border-gray-100">
                    {/* Botão Diminuir */}
                    <button 
                        onClick={() => onDecrease(id)}
                        className="text-[#5714d7] hover:text-[#7929c8] p-1 disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Icon name="faMinus" className="w-4 h-4" />
                    </button>
                    
                    {/* Quantidade */}
                    <span className="text-xl font-bold text-zinc-950 min-w-[2ch] text-center">
                        {quantity}
                    </span>
                    
                    {/* Botão Aumentar */}
                    <button 
                        onClick={() => onIncrease(id)}
                        className="text-[#5714d7] hover:text-[#7929c8] p-1"
                    >
                        <Icon name="faPlus" className="w-4 h-4" />
                    </button>
                </div>

                {/* Botão Remover (Ícone de Lixeira) */}
                <button 
                    onClick={() => onRemove(id)}
                    className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                    <Icon name="faTrashCan" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};