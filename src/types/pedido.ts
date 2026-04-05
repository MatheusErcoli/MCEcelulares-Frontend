type PedidoType = {
    id_pedido: number;
    id_usuario: number;
    id_endereco: number;
    data: Date;
    valor_total: number;
    ativo: boolean;
    status: string;
}

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