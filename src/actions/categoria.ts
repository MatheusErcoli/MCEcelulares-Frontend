const API_URL = 'http://localhost:3000';

export async function getCategoriasAPI() {
  try {
  const response = await fetch(`${API_URL}/categoria`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      categorias: data
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}