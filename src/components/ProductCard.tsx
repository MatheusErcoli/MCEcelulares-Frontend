"use client";

import { Button } from "./Button";
import { useUpdateCart } from "../hooks/useUpdateCart";

interface ProductCardProps {
    product: ProductType
}

export const ProductCard = ({ product }: ProductCardProps) => {
const { addToCart, isAdding } = useUpdateCart();

  const handleAdd = () => {
    addToCart({
      id_produto: product.id_produto,
      preco: product.preco
    });
  };

    return (
        <div className="bg-white rounded-[23px] overflow-hidden flex flex-col border-2 p-[1px] m-[10px] border-purple-800">

            <div className="bg-[#E5E7EB] p-5 flex items-center justify-center relative aspect-[3/2] bg-product-pattern bg-repeat bg-center shrink-0">
                <img
                    src={product.imagem}
                    alt={product.nome}
                    className="object-contain max-h-full max-w-[200px]"
                />
            </div>

            <div className="bg-white p-4 flex flex-col flex-grow justify-between items-center w-full">

                <div className="w-full flex flex-col items-center">
                    <h3 className="text-xl font-bold text-black text-center mt-2 leading-tight line-clamp-2 min-h-[56px] w-full">
                        {product.nome}
                    </h3>

                    <p className="text-lg font-semibold text-purple-800 mt-1 mb-2">
                        R${product.preco}
                    </p>
                </div>

                <div className="w-full mt-auto">
                    <Button
                        text={isAdding ? "Adicionando..." : "Adicionar"}
                        icon="faCartShopping"
                        onClick={handleAdd}
                    />
                </div>

            </div>
        </div>
    );
};