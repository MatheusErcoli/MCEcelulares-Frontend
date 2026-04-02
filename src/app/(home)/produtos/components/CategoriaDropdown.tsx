'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useGetCategorias } from '@/src/hooks/categoria/useGetCategorias';

export const CategoriaDropdown = () => {
  const { execute, categorias, isLoading } = useGetCategorias();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategoria = searchParams.get('id_categoria') ?? '';

  useEffect(() => {
    execute();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set('id_categoria', e.target.value);
    } else {
      params.delete('id_categoria');
    }

    params.delete('id_marca');
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={selectedCategoria}
      onChange={handleChange}
      disabled={isLoading || categorias.length === 0}
      className="
        appearance-none cursor-pointer
        bg-gray-100 hover:bg-gray-200
        text-gray-800 font-medium text-sm
        px-5 py-2.5 pr-9
        rounded-full
        border-none outline-none
        bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200l5%206%205-6z%22%2F%3E%3C%2Fsvg%3E')]
        bg-no-repeat bg-[right_14px_center]
        transition-colors duration-150
        disabled:cursor-not-allowed disabled:opacity-50
      "
    >
      <option value="">
        {isLoading ? 'Carregando...' : 'Todas as categorias'}
      </option>
      {categorias.map((c) => (
        <option key={c.id_categoria} value={String(c.id_categoria)}>
          {c.nome}
        </option>
      ))}
    </select>
  );
};