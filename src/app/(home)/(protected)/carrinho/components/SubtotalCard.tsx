import { ReactNode } from "react";
import { Button } from "@/src/components/Button";

interface SubtotalCardProps {
  subtotal: number;
  totalItens: number;
  enderecoSelecionado: EnderecoType | null;
  enderecoSelector: ReactNode;
  finalizando: boolean;
  errorPedido: string | null;
  onFinalizar: () => void;
}

export const SubtotalCard = ({
  subtotal,
  totalItens,
  enderecoSelecionado,
  enderecoSelector,
  finalizando,
  errorPedido,
  onFinalizar,
}: SubtotalCardProps) => {
  const podeFinalizar = totalItens > 0 && enderecoSelecionado !== null && !finalizando;

  return (
    <aside className="bg-[#e5e5e5] p-8 rounded-[40px] flex flex-col gap-6 h-fit sticky top-5">

      {enderecoSelector}

      <div className="border-t border-gray-300" />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-gray-600">
          <span className="text-lg">Subtotal</span>
          <span className="font-semibold text-black">
            R$ {subtotal.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <span className="text-lg">Frete</span>
          <span className="font-semibold text-green-600">Grátis</span>
        </div>

        <div className="border-t border-gray-300 my-2" />

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-black">Total</span>
          <span className="text-2xl font-bold text-[#5714d7]">
            R$ {subtotal.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      {!podeFinalizar && totalItens > 0 && !finalizando && (
        <p className="text-xs text-center text-amber-600 font-medium -mb-3">
          Selecione um endereço para continuar.
        </p>
      )}

      {errorPedido && (
        <p className="text-xs text-center text-red-500 font-medium -mb-3">
          {errorPedido}
        </p>
      )}

      <Button
        text={finalizando ? "Processando..." : "Finalizar compra"}
        disabled={!podeFinalizar}
        onClick={onFinalizar}
        className="w-full text-lg font-bold text-white p-4 rounded-full transition-opacity bg-linear-to-r from-[#5714d7] to-[#7929c8] hover:opacity-90 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
      />
    </aside>
  );
};