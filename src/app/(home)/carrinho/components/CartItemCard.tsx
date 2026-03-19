export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface CartItemCardProps {
    item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
    return (
        <div className="bg-[#e5e5e5] p-6 rounded-[40px] flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-xs text-gray-400">
                    Img
                </div>
                <span className="text-xl font-bold">{item.name}</span>
            </div>
            <div className="text-xl font-semibold">
                R${item.price.toFixed(2)}
            </div>
        </div>
    );
};