"use client";

import { useAddItem } from "../hooks/cart/useAddItem";
import { Button } from "./Button";

interface ProductType {
  id_produto: number;
  nome: string;
  preco: number;
  imagem: string;
}

interface ProductCardProps {
  product: ProductType;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { execute, isAdding } = useAddItem();

  const handleAdd = async () => {
    const id_usuario = Number(localStorage.getItem("id_usuario"));
    const token = localStorage.getItem("token");

    if (!id_usuario || !token) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }

    const res = await execute(
      id_usuario,
      product.id_produto,
      product.preco,
      token
    );

    if (res.success) {
      console.log("Produto adicionado com sucesso!");
    } else {
      alert("Erro ao adicionar itens ao carrinho.");
    }
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
            text={isAdding ? "Processando..." : "Adicionar"}
            icon="faCartShopping"
            onClick={handleAdd}
            disabled={isAdding}
          />
        </div>
      </div>
    </div>
  );
};