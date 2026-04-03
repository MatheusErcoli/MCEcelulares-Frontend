import { Icon } from '@/src/components/Icon';

interface EnderecoCardProps {
  endereco: EnderecoType;
}

export const EnderecoCard = ({ endereco }: EnderecoCardProps) => {
  return (
    <div className="bg-gray-100 rounded-[30px] p-6 flex items-start gap-4">
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
  );
};