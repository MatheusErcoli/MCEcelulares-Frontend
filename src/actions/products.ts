export async function getProductsAction() {
    try {
        const response = await fetch("http://localhost:3000/produto");

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`Falha na API: Status ${response.status} - Detalhes: ${errorDetails}`);
            console.error(`URL tentada: ${response.url}`);
            return [];
        }

        const responseData = await response.json();

        if (!responseData.data || !Array.isArray(responseData.data)) {
            console.error("A API não retornou um array de produtos dentro de 'data'");
            return [];
        }

        return responseData.data.map((item: any) => ({
            id: item.id_produto || item.id,
            name: item.nome || item.name,
            price: Number(item.preco || item.price),
            image: item.imagem || item.imagemUrl || item.image || "https://picsum.photos/id/250/300/200"
        }));

    } catch (error) {
        console.error("Erro de conexão ao buscar produtos:", error);
        return [];
    }
}

export async function getPaginatedProducts(page: number, limit: number) {
    try {
        const response = await fetch(`http://localhost:3000/produto?page=${page}&limit=${limit}`);
   
        const data = await response.json();

        if (!response.ok) {
         return { success: false, error: data.message};
        }

        return { success: true, data: data };

    } catch (error) {
        return { success: false, error: "Erro ao buscar paginação de produtos" };
    }
}

export async function getAllProducts() {
    try {
        const response = await fetch(`http://localhost:3000/produtos/todos`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao buscar a lista completa.");
        }

        const result: ProductType[] = await response.json(); 

        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}