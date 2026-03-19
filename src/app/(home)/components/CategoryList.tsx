'use client'

import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {
    return (
    <div className="flex flex-wrap gap-5 justify-center p-6 pb-15">
        <CategoryCard name="Fones" icon="faHeadphones"/>
        <CategoryCard name="Televisão" icon="faTv"/>
        <CategoryCard name="Teclados" icon="faKeyboard"/>
        <CategoryCard name="Acessórios" icon="faPlug"/>
        <CategoryCard name="Celulares" icon="faMobileScreenButton"/>
        <CategoryCard name="Consoles" icon="faGamepad"/>
    </div>
    );
}