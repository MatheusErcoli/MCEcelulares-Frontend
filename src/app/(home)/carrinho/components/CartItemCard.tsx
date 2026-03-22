import { Button } from "@/src/components/Button";

export interface CartItem {
    id_item_carrinho: number;
    id_carrinho: number;
    id_produto: number;
    preco_unitario: number;
    quantidade: number;
    produto?: {
        nome: string;
        imagem: string;
        preco: number;
    }
}

interface CartItemCardProps {
    item: CartItem;
    onRemove: (id: number) => void;
}

export const CartItemCard = ({ item, onRemove }: CartItemCardProps) => {
    return (
        <div className="bg-[#e5e5e5] p-6 rounded-[40px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200">
                    {item.produto?.imagem ? (
                        <img src={item.produto.imagem} alt={item.produto.nome} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400 text-xs font-bold uppercase">Img</span>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-800">{item.produto?.nome || "Produto"}</span>
                    <span className="text-sm text-gray-500">Quantidade: {item.quantidade}</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-xl font-bold text-[#5714d7]">
                    R${Number(item.preco_unitario).toFixed(2)}
                </div>
                
                <Button 
                    text="" 
                    icon="faTrash" 
                    onClick={() => onRemove(item.id_item_carrinho)}
                    className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-none border-none"
                />
            </div>
        </div>
    );
};