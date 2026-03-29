export async function getAllProducts() {
    try {
        const response = await fetch(`http://localhost:3000/produto`);

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message };
        }

        return {
            success: true,
            products: data.data as ProductType[]
        };

    } catch (error) {
        return { success: false, error: "Erro ao buscar paginação de produtos" };
    }
}

export async function getPaginatedProducts(page: number, limit: number) {
    try {
        const response = await fetch(`http://localhost:3000/produto?page=${page}&limit=${limit}`);

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message };
        }

        return { success: true,
            products: data.data,
            totalPages: data.totalPages,
            total: data.total};

    } catch (error) {
        return { success: false, error: "Erro ao buscar paginação de produtos" };
    }
}

export async function getFeaturedProducts() {
    try {
        const response = await fetch(`http://localhost:3000/produto?destaque=true`);

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.message };
        }

        return { success: true, featuredProducts:data.data as ProductType[] };

    } catch (error) {
        return { success: false, error: "Erro ao buscar paginação de produtos em destaque" };
    }
}