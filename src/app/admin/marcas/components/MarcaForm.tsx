'use client';

import { useRouter } from 'next/navigation';
import { InputWhite } from '@/src/components/layout/InputWhite';
import { Icon } from '@/src/components/layout/Icon';
import { useCreateMarca } from '@/src/hooks/marca/useCreateMarca';
import { Button } from '@/src/components/layout/Button';

export const MarcaForm = () => {
    const router = useRouter();
    const { execute: createMarca, loading } = useCreateMarca();

    const handleSubmit = async (formData: FormData) => {
        const result = await createMarca(formData);
        if (result?.success) router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                action={handleSubmit}
                className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                    <Icon name="faStar" className="w-8" />
                    Cadastrar marca
                </h2>

                <InputWhite
                    name="nome"
                    type="text"
                    placeholder="Nome da marca"
                    required
                    minLength={2}
                    maxLength={100}
                    title="O nome deve ter entre 2 e 100 caracteres."
                />

                <Button
                    text={loading ? 'Salvando...' : 'Salvar marca'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};