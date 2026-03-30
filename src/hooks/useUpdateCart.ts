import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { addItemToCart } from "../actions/cart";

interface useUpdateCartProps {
  id_produto: number;
  preco: number;
  quantidade?: number;
}

export const useUpdateCart = () => {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const { token, user } = useAuth();

  const addToCart = async ({ id_produto, preco, quantidade = 1 }: useUpdateCartProps) => {
    if (!token || !user) {
      alert("Você precisa estar logado para adicionar itens ao carrinho!");
      router.push("/login");
      return;
    }

    setIsAdding(true);

    try {
      const result = await addItemToCart(user.id, id_produto, preco, quantidade, token);

      if (result.success) {
        router.push("/carrinho");
      } else {
        alert(result.error || "Erro ao adicionar produto");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro inesperado ao adicionar o produto.");
    } finally {
      setIsAdding(false);
    }
  };

  return { addToCart, isAdding };
};