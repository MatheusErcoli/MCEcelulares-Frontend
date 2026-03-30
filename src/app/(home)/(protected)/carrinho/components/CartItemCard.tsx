'use client'

import { Button } from "@/src/components/Button";
import { useUpdateCart } from "@/src/hooks/useUpdateCart";

// 1. Adicionamos a tipagem da propriedade que vem do pai
interface CartItemCardProps {
    item: CartItemType;
    onUpdate: () => void; 
}

export const CartItemCard = ({ item, onUpdate }: CartItemCardProps) => {
    const { addToCart } = useUpdateCart();

    // 2. Usamos async/await para aguardar a requisição terminar
    const handleAdd = async () => {
        await addToCart({
            id_produto: item.id_produto,
            preco: item.preco_unitario,
            quantidade: 1
        });
        // 3. O banco salvou? Avisamos o pai para buscar os dados de novo!
        onUpdate(); 
    };

    const handleMinus = async () => {
        await addToCart({
            id_produto: item.id_produto,
            preco: item.preco_unitario,
            quantidade: -1
        });
        onUpdate();
    };
    
    const handleDelete = async () => {
        await addToCart({
            id_produto: item.id_produto,
            preco: item.preco_unitario,
            quantidade: -item.quantidade
        });
        onUpdate();
    };

    return (
        <div className="bg-white p-4 rounded-[50px] text-xl flex items-center justify-between shadow-sm border border-gray-100 max-w-4xl">

            <div className="flex items-center gap-6">
                <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                    <img
                        src={item.produto.imagem}
                        alt={item.produto.nome}
                        className="w-full h-full object-contain"
                    />
                </div>

                <h2 className="text-lg font-bold text-black">
                    {item.produto?.nome || "Produto"}
                </h2>
            </div>

            <div className="flex items-center gap-8">

                <div className="flex items-center gap-4">
                    <Button
                        icon="faPlus"
                        className="text-[#5714d7] hover:opacity-75 transition-opacity"
                        onClick={handleAdd}
                    />
                    <span className="font-bold text-black">
                        {item.quantidade}
                    </span>
                    <Button
                        icon="faMinus"
                        className="text-[#5714d7] hover:opacity-75 transition-opacity"
                        onClick={handleMinus}
                    />
                </div>

                <div className="font-bold text-[#5714d7]">
                    R${Number(item.produto.preco).toFixed(2).replace('.', ',')}
                </div>
                <Button
                    icon="faTrash"
                    className="text-[#ff5c8a] hover:opacity-75 transition-opacity"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
};