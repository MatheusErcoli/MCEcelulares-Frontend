// src/components/CartPage/CartLayout.tsx
"use client"; // Necessário para gerenciar estado no Next.js (App Router)

import { useState } from "react";
import { CartItem } from "./components/CartItem";
import { Icon } from "@/src/components/ui/Icon";
import Link from "next/link";
import { Button } from "@/src/components/ui/Button";

// Dados de exemplo baseados na imagem
const initialCartItems = [
    { id: 1, name: "PlayStation 5", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps5.png" },
    { id: 2, name: "PlayStation 1", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps1.png" },
    { id: 3, name: "PlayStation 2", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps2.png" },
    { id: 4, name: "PlayStation 3", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps3.png" },
];

const Carrinho = () => {
    // Gerenciamento de estado dos itens do carrinho
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Funções de manipulação do carrinho
    const increaseQuantity = (id: number) => {
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (id: number) => {
        setCartItems(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Cálculos do Resumo
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // Pode adicionar frete/descontos aqui no futuro

    // Formatação de moeda
    const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

return (
        <main className="min-h-screen bg-white p-6 md:p-12">
            {/* Container Principal com largura máxima para não espalhar demais em telas Ultra-Wide */}
            <div className="max-w-7xl mx-auto">
                
                <h1 className="text-4xl font-bold mb-10">Meu Carrinho</h1>

                {/* GRID SISTEM: 
                   grid-cols-1: Uma coluna no celular.
                   lg:grid-cols-3: Três colunas no desktop (2 para itens, 1 para resumo).
                */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* COLUNA DOS ITENS (Ocupa 2 das 3 colunas no desktop) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/*<CartItem name="PlayStation 5" price={4000} />
                        <CartItem name="PlayStation 1" price={4000} />
                        <CartItem name="PlayStation 2" price={4000} />
                        <CartItem name="PlayStation 3" price={4000} />*/}
                    </div>

                    {/* COLUNA DO RESUMO (Ocupa 1 coluna) */}
                    <aside className="bg-[#e5e5e5] p-8 rounded-[40px] flex flex-col gap-6">
                        <h2 className="text-2xl font-bold">Resumo da compra</h2>
                        
                        <div className="flex flex-col gap-4 text-xl font-semibold">
                            <div className="flex justify-between">
                                <span>PlayStation 5</span>
                                <span>-4000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>PlayStation 1</span>
                                <span>-4000</span>
                            </div>
                            <div className="flex justify-between border-b-2 border-zinc-400 pb-4">
                                <span>PlayStation 2</span>
                                <span>-4000</span>
                            </div>
                            
                            <div className="flex justify-between text-3xl font-bold mt-2">
                                <span>Total</span>
                                <span>-12000</span>
                            </div>
                        </div>

                        <Button text="Finalizar compra" className="bg-[#6b21a8] hover:bg-[#5714d7] text-white py-4 rounded-full font-bold transition-all" />
                    </aside>

                </div>
            </div>
        </main>
    );
};

export default Carrinho