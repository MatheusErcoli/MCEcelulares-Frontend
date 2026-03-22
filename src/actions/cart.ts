const API_URL = "http://localhost:3000";

export async function fetchOrCreateCart(id_usuario: number) {
  try {
    const response = await fetch(`${API_URL}/carrinho/usuario/${id_usuario}`);
    if (!response.ok) throw new Error("Erro ao buscar/criar carrinho");
    const cart = await response.json();
    return { success: true, cartId: cart.id_carrinho };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Servidor indisponível." };
  }
}

export async function addItemToAPI(id_carrinho: number, id_produto: number, preco: number) {
  try {
    const response = await fetch(`${API_URL}/itemcarrinho`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_carrinho,
        id_produto,
        preco_unitario: preco,
        quantidade: 1 
      }),
    });
    if (!response.ok) throw new Error("Erro ao adicionar item");
    const data = await response.json();
    return { success: true, item: data };
  } catch (error) {
    return { success: false, error: "Falha ao adicionar ao carrinho." };
  }
}

export async function getCartItemsAction(id_carrinho: number) {
  try {
    const response = await fetch(`${API_URL}/itemcarrinho/carrinho/${id_carrinho}`);
    const data = await response.json();
    if (!response.ok) return { success: false, items: [] };
    return { success: true, items: data };
  } catch (error) {
    return { success: false, items: [] };
  }
}

export async function removeItemFromAPI(id_item_carrinho: number) {
  try {
    const response = await fetch(`${API_URL}/itemcarrinho/${id_item_carrinho}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao remover item");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}