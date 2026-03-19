import { CartItemCard, CartItem } from "./CartItemCard";

interface CartItemListProps {
    items: CartItem[];
}

export const CartItemList = ({ items }: CartItemListProps) => {
    return (
        <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};