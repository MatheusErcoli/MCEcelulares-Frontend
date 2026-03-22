import { CartItem } from "./components/CartItemCard";
import { CartItemList } from "./components/CartItemList";
import { SubtotalCard } from "./components/SubtotalCard";

const Carrinho = () => {
    return (
        <main className="min-h-screen md:p-12">
            <div className="max-w-7xl mx-auto">
                
                <h1 className="text-4xl font-bold mb-10">Meu Carrinho</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <CartItemList />

                    <SubtotalCard />
                </div>
                
            </div>
        </main>
    );
};

export default Carrinho;