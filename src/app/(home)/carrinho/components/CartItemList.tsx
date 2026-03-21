"use client";

import { useEffect, useState } from "react";
import { CartItemCard, CartItem } from "./CartItemCard";
import { useCart } from "@/src/contexts/CartContext";
import { getCartItemsAction } from "@/src/actions/cart";

export const CartItemList = () => {
    const { cartId } = useCart();
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadItems() {
            if (cartId) {
                setLoading(true);
                const result = await getCartItemsAction(cartId);
                if (result.success) {
                    setItems(result.items);
                }
                setLoading(false);
            }
        }

        loadItems();
    }, [cartId]); // Recarrega se o cartId mudar

    if (loading) {
        return <div className="lg:col-span-2 text-center py-10">Carregando seu carrinho...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm text-center">
                <p className="text-gray-500 text-xl font-medium">Seu carrinho está vazio.</p>
            </div>
        );
    }

    return (
        <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};