'use client'

import { Button } from "@/src/components/Button";
import { useRouter, useSearchParams } from "next/navigation";

type CategoriaProps = {
    id: number;
    name: string;
}

export const CategoriaCard = ({ id, name }: CategoriaProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const isSelected = searchParams.get('id_categoria') === String(id);

    const handleClick = () => {
        if (isSelected) {
            router.push('/produtos');
        } else {
            router.push(`produtos?id_categoria=${id}`);
        }
    };

    return (
        <Button
            text={name}
            onClick={handleClick}
            className={`flex gap-5 m-[7px] mt-[50px] px-[20px] flex-col font-semibold items-center justify-center w-41 h-40 rounded-[30px] shadow-sm transition-colors text-gray-700 text-3xl
                ${isSelected ? 'bg-[#5714d7] text-black' : 'bg-[#E5E7EB] hover:bg-gray-300'}`}
        />
    );
}