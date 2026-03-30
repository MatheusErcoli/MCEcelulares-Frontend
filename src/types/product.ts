type ProductType = {
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

type CartType = {
  id_carrinho: number;
  id_usuario: number;
  data_criacao: Date;
  ativo: boolean;
}

type CartItemType = {
  id_item_carrinho: number;
  id_carrinho: number;
  id_produto: number;
  preco_unitario: number;
  quantidade: number;
  produto: ProductType;
}