import { Button } from "@/src/components/Button";

export const SubtotalCard = () => {
    return (
        <aside className="bg-[#e5e5e5] p-8 rounded-[40px] flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Resumo da compra</h2>

            <div className="flex flex-col gap-4 text-xl font-semibold">
                <div className="flex justify-between">
                    <span>PlayStation 5</span>
                    <span>-4000</span>
                </div>
                <div className="flex justify-between">
                    <span>PlayStation 1</span>
                    <span>-4000</span>
                </div>
                <div className="flex justify-between border-b-2 border-zinc-400 pb-4">
                    <span>PlayStation 2</span>
                    <span>-4000</span>
                </div>

                <div className="flex justify-between text-3xl font-bold mt-2">
                    <span>Total</span>
                    <span>-12000</span>
                </div>
            </div>

            <Button
                text="Finalizar compra"
            />
        </aside>
    );
};