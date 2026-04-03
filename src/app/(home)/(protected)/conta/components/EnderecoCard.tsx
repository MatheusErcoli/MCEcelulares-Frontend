'use client';

import { Icon } from '@/src/components/Icon';
import { Button } from '@/src/components/Button';
import { useDeleteEndereco } from '@/src/hooks/endereco/useDeleteEndereco';

interface EnderecoCardProps {
  endereco: EnderecoType;
  onDelete: () => void;
}

export const EnderecoCard = ({ endereco, onDelete }: EnderecoCardProps) => {
  const { execute: remover, isLoading: removendo } = useDeleteEndereco();

  const handleDelete = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Você precisa estar logado para remover um endereço.');
      return;
    }

    const res = await remover(endereco.id_endereco, token);

    if (res.success) {
      onDelete();
    } else {
      alert('Erro ao remover endereço.');
    }
  };

  return (
    <div className="bg-gray-100 rounded-[30px] p-6 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <Icon name="faLocationDot" className="text-purple-700 mt-1 text-xl" />
        <div className="flex flex-col gap-1 text-gray-700">
          <p className="font-semibold text-gray-900">
            {endereco.endereco}, {endereco.numero}
            {endereco.complemento && ` — ${endereco.complemento}`}
          </p>
          {endereco.bairro && <p className="text-sm">{endereco.bairro}</p>}
          <p className="text-sm">
            {endereco.cidade} — {endereco.estado} — CEP: {endereco.cep}
          </p>
        </div>
      </div>

      <Button
        icon="faTrash"
        className="text-[#ff5c8a] hover:opacity-75 transition-opacity disabled:opacity-50"
        onClick={handleDelete}
        disabled={removendo}
      />
    </div>
  );
};