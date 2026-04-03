'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateEndereco } from '@/src/hooks/endereco/useCreateEndereco';
import { InputWhite } from '@/src/components/InputWhite';
import { Button } from '@/src/components/Button';
import { Icon } from '@/src/components/Icon';

export const EnderecoForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const { createEndereco, loading, error } = useCreateEndereco();

    const handleSubmit = async (formData: FormData) => {
        const success = await createEndereco(formData);
        if (success) {
            router.back();
        } else {
            formRef.current?.reset();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                ref={formRef}
                action={handleSubmit}
                className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                    <Icon name="faLocationDot" className="w-8" />
                    Cadastrar endereço
                </h2>

                {error && (
                    <p className="text-center font-medium text-red-600 animate-pulse text-sm">
                        {error}
                    </p>
                )}

                <InputWhite name="endereco" type="text" placeholder="Rua / Avenida" required={true} />

                <div className="grid grid-cols-2 gap-4">
                    <InputWhite name="numero" type="text" placeholder="Número" required={true} />
                    <InputWhite name="complemento" type="text" placeholder="Complemento (opcional)" required={false} />
                </div>

                <InputWhite name="bairro" type="text" placeholder="Bairro (opcional)" required={false} />

                <div className="grid grid-cols-2 gap-4">
                    <InputWhite name="cidade" type="text" placeholder="Cidade" required={true} />
                    <InputWhite name="estado" type="text" placeholder="UF" required={true} maxLength={2} />
                </div>

                <InputWhite name="cep" type="text" placeholder="CEP (somente números)" required={true} maxLength={8} pattern="\d{8}" title="CEP deve conter 8 números" />

                <Button
                    text={loading ? 'Salvando...' : 'Salvar endereço'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};