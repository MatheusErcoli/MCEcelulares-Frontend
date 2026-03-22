"use client";

import { useEffect, useState } from "react";
import { CartItemCard, CartItem } from "./CartItemCard";
import { useCart } from "@/src/contexts/CartContext";
import { getCartItemsAction } from "@/src/actions/cart";

export const CartItemList = () => {
    const { cartId, removeFromCart } = useCart();
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadItems() {
            if (cartId) {
                setLoading(true);
                const result = await getCartItemsAction(cartId);
                if (result.success) setItems(result.items);
                setLoading(false);
            }
        }
        loadItems();
    }, [cartId]);

    const handleRemove = async (id_item_carrinho: number) => {
        
        const result = await removeFromCart(id_item_carrinho);
        if (result.success) {
            setItems(prev => prev.filter(item => item.id_item_carrinho !== id_item_carrinho));
        } else {
            alert("Erro ao remover item.");
        }
    };

    if (loading) return <div className="lg:col-span-2 text-center py-20 font-medium">Carregando produtos...</div>;

    if (items.length === 0) {
        return (
            <div className="lg:col-span-2 bg-white p-16 rounded-[40px] text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-xl font-semibold">Seu carrinho está vazio.</p>
            </div>
        );
    }

    return (
        <div className="lg:col-span-2 flex flex-col gap-5">
            {items.map((item) => (
                <CartItemCard 
                    key={item.id_item_carrinho} 
                    item={item} 
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};