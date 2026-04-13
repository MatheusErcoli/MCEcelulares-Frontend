'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useGetPedidosAdm } from '@/src/hooks/pedido/useGetPedidosAdm';

interface PedidosAdmContextType {
    pedidos: PedidoType[];
    total: number;
    loading: boolean;
    error: string | null;
}

const PedidosAdmContext = createContext<PedidosAdmContextType | null>(null);

export const PedidosAdmProvider = ({ children }: { children: ReactNode }) => {
    const { execute, pedidos, total, loading, error } = useGetPedidosAdm();

    useEffect(() => {
        execute();
    }, [execute]);

    return (
        <PedidosAdmContext.Provider value={{ pedidos, total, loading, error }}>
            {children}
        </PedidosAdmContext.Provider>
    );
};

export const usePedidosAdm = () => {
    const ctx = useContext(PedidosAdmContext);
    if (!ctx) throw new Error('usePedidosAdm deve ser usado dentro de PedidosAdmProvider');
    return ctx;
};