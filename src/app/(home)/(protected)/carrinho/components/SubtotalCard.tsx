import { Button } from "@/src/components/Button";

interface SubtotalCardProps {
    subtotal: number;
    totalItens: number;
}

export const SubtotalCard = ({ subtotal, totalItens }: SubtotalCardProps) => {
    return (
        <aside className="bg-[#e5e5e5] p-8 rounded-[40px] flex flex-col gap-6 h-fit sticky top-5">

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-gray-600">
                    <span className="text-lg">Subtotal</span>
                    <span className="font-semibold text-black">
                        R$ {subtotal.toFixed(2).replace('.', ',')}
                    </span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                    <span className="text-lg">Frete</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                </div>

                <div className="border-t border-gray-300 my-2"></div>

                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-black">Total</span>
                    <span className="text-2xl font-bold text-[#5714d7]">
                        R$ {subtotal.toFixed(2).replace('.', ',')}
                    </span>
                </div>
            </div>

            <Button
                text="Finalizar compra"
                disabled={totalItens === 0}
                className="w-full text-lg font-bold text-white p-4 rounded-full transition-opacity bg-linear-to-r from-[#5714d7] to-[#7929c8] hover:opacity-90 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
            />
        </aside>
    );
};