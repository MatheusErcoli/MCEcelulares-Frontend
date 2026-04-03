'use client';

import { Icon } from '@/src/components/Icon';

interface ItemPedido {
  id_item: number;
  id_produto: number;
  quantidade: number;
  preco_unitario: number;
}

interface PedidoCardProps {
  pedido: {
    id_pedido: number;
    valor_total: number;
    status: string;
    data: string;
    endereco: EnderecoType | null;
    itens: ItemPedido[];
  };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  CRIADO:               { label: 'Criado',               color: 'text-gray-600',   bg: 'bg-gray-100' },
  AGUARDANDO_PAGAMENTO: { label: 'Aguard. Pagamento',    color: 'text-amber-700',  bg: 'bg-amber-100' },
  PAGO:                 { label: 'Pago',                 color: 'text-blue-700',   bg: 'bg-blue-100' },
  ENVIADO:              { label: 'Enviado',              color: 'text-purple-700', bg: 'bg-purple-100' },
  ENTREGUE:             { label: 'Entregue',             color: 'text-green-700',  bg: 'bg-green-100' },
  CANCELADO:            { label: 'Cancelado',            color: 'text-red-600',    bg: 'bg-red-100' },
};

export const PedidoCard = ({ pedido }: PedidoCardProps) => {
  const status = STATUS_CONFIG[pedido.status] ?? STATUS_CONFIG['CRIADO'];
  const data = new Date(pedido.data).toLocaleDateString('pt-BR');
  const total = Number(pedido.valor_total).toFixed(2).replace('.', ',');

  return (
    <div className="bg-white rounded-[32px] p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm font-medium">Pedido</span>
          <span className="font-bold text-gray-900">#{pedido.id_pedido}</span>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.bg} ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="border-t border-gray-100" />

      {/* Itens */}
      <div className="flex flex-col gap-2">
        {pedido.itens.map((item) => (
          <div key={item.id_item} className="flex justify-between items-center text-sm text-gray-700">
            <span>
              <span className="font-semibold text-gray-900">{item.quantidade}×</span>{' '}
              Produto #{item.id_produto}
            </span>
            <span className="font-semibold">
              R$ {(item.quantidade * Number(item.preco_unitario)).toFixed(2).replace('.', ',')}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100" />

      {/* Rodapé */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        {pedido.endereco && (
          <div className="flex items-start gap-2 text-xs text-gray-500">
            <Icon name="faLocationDot" className="text-purple-600 mt-0.5" />
            <span>
              {pedido.endereco.endereco}, {pedido.endereco.numero} —{' '}
              {pedido.endereco.cidade}/{pedido.endereco.estado}
            </span>
          </div>
        )}
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-400">{data}</p>
          <p className="text-xl font-bold text-[#5714d7]">R$ {total}</p>
        </div>
      </div>

    </div>
  );
};