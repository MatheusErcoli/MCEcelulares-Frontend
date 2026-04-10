'use client';

import { useRouter } from 'next/navigation';
import { InputWhite } from '@/src/components/layout/InputWhite';
import { Icon } from '@/src/components/layout/Icon';
import { useCreateCategoria } from '@/src/hooks/categoria/useCreateCategoria';
import { Button } from '@/src/components/layout/Button';

export const CategoriaForm = () => {
    const router = useRouter();
    const { execute: createCategoria, loading } = useCreateCategoria();

    const handleSubmit = async (formData: FormData) => {
        const result = await createCategoria(formData);
        if (result?.success) router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                action={handleSubmit}
                className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                    <Icon name="faList" className="w-8" />
                    Cadastrar categoria
                </h2>

                <InputWhite
                    name="nome"
                    type="text"
                    placeholder="Nome da categoria"
                    required
                    minLength={2}
                    maxLength={100}
                    title="O nome deve ter entre 2 e 100 caracteres."
                />

                <textarea
                    name="descricao"
                    required
                    placeholder="Descrição da categoria..."
                    rows={4}
                    minLength={5}
                    maxLength={300}
                    title="A descrição deve ter entre 5 e 300 caracteres."
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />

                <Button
                    text={loading ? 'Salvando...' : 'Salvar categoria'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};