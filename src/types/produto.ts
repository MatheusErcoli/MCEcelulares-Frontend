type ProdutoType = {
  id_produto: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  estoque: number;
  destaque: boolean;
  ativo: boolean;
  id_marca: number;
  id_categoria: number;
  marca?: MarcaType;
  categoria?: CategoriaType;
}

type PaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
};

type CarrinhoType = {
  id_carrinho: number;
  id_usuario: number;
  data_criacao: Date;
  ativo: boolean;
}

type ItemCarrinhoType = {
  id_item_carrinho: number;
  id_carrinho: number;
  id_produto: number;
  preco_unitario: number;
  quantidade: number;
  produto: ProdutoType;
}

type CategoriaType = {
  id_categoria: number;
  nome: string;
  descricao: string | null;
  ativo: boolean;
}

type MarcaType = {
  id_marca: number;
  nome: string;
}