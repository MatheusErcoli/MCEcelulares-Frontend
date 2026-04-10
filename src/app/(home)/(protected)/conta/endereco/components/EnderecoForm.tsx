'use client';

import { useRouter } from 'next/navigation';
import { InputWhite } from '@/src/components/layout/InputWhite';
import { Icon } from '@/src/components/layout/Icon';
import { useCreateEndereco } from '@/src/hooks/endereco/useCreateEndereco';
import { Button } from '@/src/components/layout/Button';

export const EnderecoForm = () => {
    const router = useRouter();
    const { execute: createEndereco, loading } = useCreateEndereco();

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
                    mask="00000-000"
                    minLength={9}
                    pattern="\d{9}"
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