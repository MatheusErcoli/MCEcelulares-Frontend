'use client'

import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {
    return (
    <div className="flex flex-wrap gap-5 justify-center p-6 pb-15">
        <CategoryCard name="Celulares" icon="faMobileScreenButton"/>
        <CategoryCard name="Notebook" icon="faLaptop"/>
        <CategoryCard name="Tablet" icon="faTabletButton"/>
        <CategoryCard name="Consoles" icon="faGamepad"/>
        <CategoryCard name="Jogos" icon="faRobot"/>
        <CategoryCard name="Periféricos" icon="faHeadphones"/>
    </div>
    );
}