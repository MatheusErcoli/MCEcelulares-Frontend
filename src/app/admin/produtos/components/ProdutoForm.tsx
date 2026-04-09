'use client';

import { useRouter } from 'next/navigation';
import { InputWhite } from '@/src/components/InputWhite';
import { Button } from '@/src/components/Button';
import { Icon } from '@/src/components/Icon';
import { useCreateProduto } from '@/src/hooks/produto/useCreateProduto';

export const ProdutoForm = () => {
    const router = useRouter();
    const { execute: createProduto, loading } = useCreateProduto();

    const handleSubmit = async (formData: FormData) => {
        const result = await createProduto(formData);
        if (result?.success) router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                action={handleSubmit}
                className="bg-gray-200 text-zinc-950 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                    <Icon name="faBox" className="w-8" />
                    Cadastrar produto
                </h2>

                <InputWhite
                    name="nome"
                    type="text"
                    placeholder="Nome do produto"
                    required
                    minLength={2}
                    maxLength={150}
                    title="O nome deve ter entre 2 e 150 caracteres."
                />

                <textarea
                    name="descricao"
                    required
                    placeholder="Descrição do produto..."
                    rows={4}
                    minLength={5}
                    maxLength={500}
                    title="A descrição deve ter entre 5 e 500 caracteres."
                    className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none resize-none"
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputWhite
                        name="preco"
                        type="number"
                        placeholder="Preço (R$)"
                        required
                        min={0.01}
                        step={0.01}
                        title="Informe um preço válido maior que zero."
                    />
                    <InputWhite
                        name="estoque"
                        type="number"
                        placeholder="Estoque"
                        required
                        min={0}
                        step={1}
                        title="Informe a quantidade em estoque."
                    />
                </div>

                <InputWhite
                    name="imagem"
                    type="url"
                    placeholder="URL da imagem"
                    required
                    title="Informe uma URL válida para a imagem do produto."
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputWhite
                        name="id_categoria"
                        type="number"
                        placeholder="ID da categoria"
                        required
                        min={1}
                        step={1}
                        title="Informe o ID da categoria."
                    />
                    <InputWhite
                        name="id_marca"
                        type="number"
                        placeholder="ID da marca"
                        required
                        min={1}
                        step={1}
                        title="Informe o ID da marca."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold px-2">Destaque</p>
                        <select
                            name="destaque"
                            required
                            defaultValue=""
                            className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Selecione...</option>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold px-2">Status</p>
                        <select
                            name="ativo"
                            required
                            defaultValue=""
                            className="w-full rounded-[30px] bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#7929c8]/50 border-none appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Selecione...</option>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                        </select>
                    </div>
                </div>

                <Button
                    text={loading ? 'Salvando...' : 'Salvar produto'}
                    type="submit"
                    disabled={loading}
                />
            </form>
        </div>
    );
};