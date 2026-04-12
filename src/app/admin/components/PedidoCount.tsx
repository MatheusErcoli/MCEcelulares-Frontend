'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/src/components/layout/Icon';
import { useAuth } from '@/src/contexts/AuthContext';
import { getPedidosAPI } from '@/src/actions/pedido';

const PedidoCount = () => {
  const { token } = useAuth();
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchCount = async () => {
      setLoading(true);
      try {
        const data = await getPedidosAPI(token);

        if (!data.success) throw new Error(data.error);

        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError((err as Error).message || 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [token]);

  return (
    <div className="bg-white rounded-[24px] p-6 flex flex-col gap-3 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Pedidos</p>
        <span className="text-purple-700 bg-purple-100 p-2 rounded-xl">
          <Icon name="faBox" />
        </span>
      </div>

      {loading && (
        <p className="text-3xl font-bold text-gray-300 animate-pulse">...</p>
      )}

      {error && (
        <p className="text-sm font-semibold text-red-400">Erro ao carregar</p>
      )}

      {!loading && !error && total !== null && (
        <p className="text-3xl font-bold text-gray-900">{total}</p>
      )}

      <p className="text-xs text-gray-400">Total no site</p>
    </div>
  );
};

export default PedidoCount;