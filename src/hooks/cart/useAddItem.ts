import { addItemAPI, initCartAPI } from '@/src/actions/cart';
import { useState, useCallback } from 'react';

export function useAddItem() {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    id_usuario: number, 
    id_produto: number, 
    preco_unitario: number, 
    token: string
  ) => {
    setIsAdding(true);
    setError(null);

    try {
      const cartData = await initCartAPI(id_usuario, token);
      
      const id_carrinho = cartData.id_carrinho; 

      await addItemAPI(
        id_usuario, 
        id_produto,
        preco_unitario, 
        token
      );

      setIsAdding(false);
      return { success: true };
    } catch (err: any) {
      console.error("Erro ao adicionar item:", err);
      setError(err.message || "Erro ao adicionar produto");
      setIsAdding(false);
      return { success: false };
    }
  }, []);

  return { execute, isAdding, error };
}