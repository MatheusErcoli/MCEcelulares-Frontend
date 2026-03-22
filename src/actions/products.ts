const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getProductsAction() {
    try {
        const response = await fetch(`${API_URL}/produto`, {
            next: { revalidate: 60 }
        });

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