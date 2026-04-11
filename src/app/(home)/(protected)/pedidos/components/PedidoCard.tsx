'use client';

import { Icon } from '@/src/components/layout/Icon';

interface PedidoCardProps {
  pedido: PedidoType;
}

export const PedidoCard = ({ pedido }: PedidoCardProps) => {
  return (
    <div className="bg-white rounded-[24px] p-5 flex flex-col gap-3 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-bold text-gray-900 text-sm">Pedido #{pedido.id_pedido}</p>
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
          {pedido.status ?? 'Em andamento'}
        </span>
      </div>

      {pedido.endereco && (
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <Icon name="faLocationDot" className="text-purple-700 mt-0.5" />
          <p>
            {pedido.endereco.endereco}, {pedido.endereco.numero} — {pedido.endereco.cidade}/{pedido.endereco.estado}
          </p>
        </div>
      )}

      {pedido.itens?.length > 0 && (
        <div className="flex flex-col gap-1">
          {pedido.itens.map((item: any) => (
            <div key={item.id_item} className="flex justify-between text-xs text-gray-600">
              <span>{item.quantidade}x {item.produto?.nome ?? `Produto #${item.id_produto}`}</span>
              <span>R$ {Number(item.preco_unitario).toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
        <p className="text-xs text-gray-400">{
          new Date(pedido.data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="font-bold text-purple-700">
          R$ {Number(pedido.valor_total).toFixed(2).replace('.', ',')}
        </p>
      </div>
    </div>
  );
};