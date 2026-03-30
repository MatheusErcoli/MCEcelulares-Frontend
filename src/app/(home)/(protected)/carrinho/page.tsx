import { CartItemList } from "./components/CartItemList";

const Carrinho = () => {
    return (
        <main className="min-h-screen md:p-12">
            <div className="max-w-7xl mx-auto">
                
                <h1 className="text-4xl font-bold mb-10">Meu Carrinho</h1>

                {/* A mágica acontece toda aqui dentro agora! */}
                <CartItemList />
                
            </div>
        </main>
    );
};

export default Carrinho;