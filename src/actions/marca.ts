const API_URL = 'http://localhost:3000';

export async function getMarcasAPI(
  body: { id_categoria?: number }
) {
  try {
    const response = await fetch(`${API_URL}/marca?id_categoria=${body.id_categoria}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      marcas: data,
      message: "Marcas encontradas com sucesso"
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    }
  }
}