export async function getActiveCartByUser(id_usuario: number, token: string) {
  try {
    const response = await fetch(`http://localhost:3000/carrinho/${id_usuario}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || "Erro ao buscar o carrinho" 
      };
    }

    return {
      success: true,
      cart: data
    };

  } catch (error) {
    return { 
      success: false, 
      error: "Erro de conexão ao buscar o carrinho do usuário" 
    };
  }
}

export async function addItemToCart(id_usuario: number, id_produto: number, preco_unitario: number, quantidade:number, token: string) {
    try {
        const payload = {
            id_usuario: Number(id_usuario),
            id_produto: Number(id_produto),
            preco_unitario: Number(preco_unitario),
            quantidade: Number(quantidade)
        };

        console.log("DADOS A SEREM ENVIADOS PELO FETCH:", payload);

        const response = await fetch(`http://localhost:3000/carrinho`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return response.ok ? { success: true } : { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: "Erro de conexão" };
    }
}