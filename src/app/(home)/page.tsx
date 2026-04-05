import { CategoriaList } from "./components/CategoriaList";
import { ProdutoDestaque } from "./components/ProdutoDestaque";

export default async function Home() {
    return (
        <>
            <CategoriaList />
            <ProdutoDestaque title="Destaques" />
            <ProdutoDestaque title="Mais pedidos" />
        </>
    );
}