import { CartItem } from "./components/CartItemCard";
import { CartItemList } from "./components/CartItemList";
import { SubtotalCard } from "./components/SubtotalCard";

const initialCartItems: CartItem[] = [
    { id: 1, name: "PlayStation 5", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps5.png" },
    { id: 2, name: "PlayStation 1", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps1.png" },
    { id: 3, name: "PlayStation 2", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps2.png" },
    { id: 4, name: "PlayStation 3", price: 4000.00, quantity: 1, imageUrl: "/img/products/ps3.png" },
];

const Carrinho = () => {
    return (
        <main className="min-h-screen md:p-12">
            <div className="max-w-7xl mx-auto">
                
                <h1 className="text-4xl font-bold mb-10">Meu Carrinho</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <CartItemList items={initialCartItems} />

                    <SubtotalCard />
                </div>
                
            </div>
        </main>
    );
};

export default Carrinho;