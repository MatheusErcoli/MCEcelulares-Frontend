'use client';

import { useRouter } from 'next/navigation';
import { InputWhite } from '@/src/components/InputWhite';
import { Button } from '@/src/components/Button';
import { Icon } from '@/src/components/Icon';
import { useCreateEndereco } from '@/src/hooks/endereco/useCreateEndereco';

export const EnderecoForm = () => {
    const router = useRouter();
    const { execute: createEndereco, loading, error } = useCreateEndereco();

    const handleSubmit = async (formData: FormData) => {
        const result = await createEndereco(formData);
        if (result?.success) router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                action={handleSubmit}
                className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                    <Icon name="faLocationDot" className="w-8" />
                    Cadastrar endereço
                </h2>

                {error && (
                    <p className="text-center font-medium text-red-600 animate-pulse text-sm">{error}</p>
                )}

                <InputWhite name="endereco" type="text" placeholder="Rua / Avenida" required />

                <div className="grid grid-cols-2 gap-4">
                    <InputWhite name="numero" type="text" placeholder="Número" required />
                    <InputWhite name="complemento" type="text" placeholder="Complemento (opcional)" />
                </div>

                <InputWhite name="bairro" type="text" placeholder="Bairro (opcional)" />

                <div className="grid grid-cols-2 gap-4">
                    <InputWhite name="cidade" type="text" placeholder="Cidade" required />
                    <InputWhite name="estado" type="text" placeholder="UF" required maxLength={2} />
                </div>

                <InputWhite
                    name="cep"
                    type="text"
                    placeholder="CEP (somente números)"
                    required
                    maxLength={8}
                    pattern="\d{8}"
                    title="CEP deve conter 8 números"
                />

                <Button
                    text={loading ? 'Salvando...' : 'Salvar endereço'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};