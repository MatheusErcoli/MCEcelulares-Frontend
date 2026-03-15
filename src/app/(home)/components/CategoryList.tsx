'use client'

import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {
    return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
        <CategoryCard name="Fones" icon="faHeadphones"/>
        <CategoryCard name="Televisão" icon="faTv"/>
        <CategoryCard name="Teclados" icon="faKeyboard"/>
        <CategoryCard name="Acessórios" icon="faPlug"/>
        <CategoryCard name="Celulares" icon="faMobileScreenButton"/>
        <CategoryCard name="Consoles" icon="faGamepad"/>
    </div>
    );
}