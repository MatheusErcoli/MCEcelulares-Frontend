'use client';

import Link from 'next/link';
import { Icon } from '@/src/components/Icon';
import { Button } from '@/src/components/Button';

interface EnderecoSelectorProps {
  enderecos: EnderecoType[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  isLoading: boolean;
}

export const EnderecoSelector = ({
  enderecos,
  selectedId,
  onSelect,
  isLoading,
}: EnderecoSelectorProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[30px] p-6">
        <p className="text-gray-400 animate-pulse text-sm">Carregando endereços...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Icon name="faLocationDot" className="text-purple-700" />
          Endereço de entrega
        </h3>
        <Link href="/conta/endereco">
          <Button
            text="Novo"
            icon="faPlus"
            className="flex items-center gap-1 text-purple-700 text-sm font-semibold hover:opacity-75 transition-opacity"
          />
        </Link>
      </div>

      {enderecos.length === 0 ? (
        <div className="bg-white rounded-[24px] p-4 border-2 border-dashed border-gray-200 text-center">
          <p className="text-gray-400 text-sm">Nenhum endereço cadastrado.</p>
          <Link href="/conta/endereco" className="text-purple-700 text-sm font-semibold hover:underline">
            Adicionar endereço
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {enderecos.map((e) => {
            const isSelected = selectedId === e.id_endereco;
            return (
              <button
                key={e.id_endereco}
                onClick={() => onSelect(e.id_endereco)}
                className={`w-full text-left rounded-[24px] p-4 border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isSelected ? 'border-purple-600' : 'border-gray-400'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-gray-900 text-sm">
                    {e.endereco}, {e.numero}
                    {e.complemento && ` — ${e.complemento}`}
                  </p>
                  {e.bairro && <p className="text-xs text-gray-500">{e.bairro}</p>}
                  <p className="text-xs text-gray-500">
                    {e.cidade} — {e.estado} — CEP: {e.cep}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};