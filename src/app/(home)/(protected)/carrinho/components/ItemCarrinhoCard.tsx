'use client'

import { Button } from "@/src/components/Button";
import { useDeleteItemCarrinho } from "@/src/hooks/carrinho/useDeleteItemCarrinho";
import { useUpdateItemCarrinho } from "@/src/hooks/carrinho/useUpdateItemCarrinho";

interface CartItemCardProps {
    item: ItemCarrinhoType;
    onUpdate: () => void;
}

export const ItemCarrinhoCard = ({ item, onUpdate }: CartItemCardProps) => {
    const { execute: alterar, loading: alterando } = useUpdateItemCarrinho();
    const { execute: remover, loading: removendo } = useDeleteItemCarrinho();

    const handleUpdate = async (quantidade: number) => {
        const res = await alterar(
            item.id_item_carrinho,
            quantidade
        );
        if (res.success) onUpdate();
    };

    const handleDelete = async () => {
        const res = await remover(
            item.id_item_carrinho
        );

        if (res.success) onUpdate()
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
                        className="text-[#5714d7] hover:opacity-75 transition-opacity disabled:opacity-50"
                        onClick={() => handleUpdate(1)}
                        disabled={alterando}
                    />
                    <span className="font-bold text-black">
                        {item.quantidade}
                    </span>
                    <Button
                        icon="faMinus" className={item.quantidade > 1 ? "text-[#5714d7] hover:opacity-75 disabled:opacity-1" : "text-gray-400"}
                        onClick={() => handleUpdate(-1)}
                        disabled={alterando || item.quantidade <= 1}
                    />
                </div>

                <div className="font-bold text-[#5714d7]">
                    R${Number(item.produto.preco).toFixed(2).replace('.', ',')}
                </div>
                <Button
                    icon="faTrash"
                    className="text-[#ff5c8a] hover:opacity-75 transition-opacity"
                    onClick={handleDelete}

                    disabled={removendo}
                />
            </div>
        </div>
    );
};