interface ProductType {
    id_produto: number;
    nome: string;
    preco: number;
    imagem: string;
}

type PaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
};