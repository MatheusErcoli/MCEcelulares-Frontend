'use client'

import { Button } from "@/src/components/Button";
import { useDeleteItem } from "@/src/hooks/cart/useDeleteItem";
import { useUpdateItemQuantity } from "@/src/hooks/cart/useUpdateItemQuantity";

interface CartItemCardProps {
    item: CartItemType;
    onUpdate: () => void;
}

export const CartItemCard = ({ item, onUpdate }: CartItemCardProps) => {
    const { execute: alterar, isLoading: alterando } = useUpdateItemQuantity();
    const { execute: remover, isLoading: removendo } = useDeleteItem();

    const handleUpdate = async (quantidade: number) => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            alert("Você precisa estar logado para alterar itens no carrinho.");
            return;
        }
        const res = await alterar(
            item.id_item_carrinho,
            quantidade,
            token
        );
        if (res.success) {
            console.log("Item alterado com sucesso!");
        } else {
            alert("Erro ao alterar item no carrinho.");
        }
        onUpdate();
    };

    const handleDelete = async () => {
        // Usando o mesmo nome de token do handleUpdate
        const token = localStorage.getItem("auth_token");
        if (!token) {
            alert("Você precisa estar logado para remover itens do carrinho.");
            return;
        }

        const res = await remover(
            item.id_item_carrinho,
            token
        );

        if (res.success) {
            console.log("Item removido com sucesso!");
            onUpdate(); // <--- IMPORTANTE: Isto faz a lista atualizar na tela!
        } else {
            alert("Erro ao remover item do carrinho.");
        }
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
                        className="text-[#5714d7] hover:opacity-75 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleUpdate(1)}
                        disabled={alterando}
                    />
                    <span className="font-bold text-black">
                        {item.quantidade}
                    </span>
                    <Button
                        icon="faMinus"
                        // Adicionadas as classes disabled:text-gray-400 e disabled:cursor-not-allowed
                        className="text-[#5714d7] hover:opacity-75 transition-opacity disabled:text-gray-400 disabled:hover:opacity-100 disabled:cursor-not-allowed"
                        onClick={() => handleUpdate(-1)}
                        // O botão agora desativa se estiver carregando a API OU se a quantidade for 1 (ou menor)
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