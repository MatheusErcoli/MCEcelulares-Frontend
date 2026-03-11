type PaginationProps = {
    totalPosts: number;
    postPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export const Pagination = ({totalPosts, postPerPage, setCurrentPage, currentPage}: PaginationProps) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i);
    }

    // Função que muda a página e rola a tela para o topo
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adiciona o efeito de rolagem suave
        });
    };

    return (
        <div className="flex justify-center gap-2 mt-8 mb-8"> {/* Adicionei mb-8 para dar um respiro no final da página */}
            {
                pages.map((page, index)=> {
                    return (
                        <button 
                            key={index} 
                            onClick={() => handlePageClick(page)} // Chamando a nova função aqui
                            className={`px-4 py-2 border rounded-md transition-colors font-medium ${
                                page === currentPage 
                                    ? 'bg-purple-700 text-white border-purple-700 hover:bg-purple-500' 
                                    : 'bg-white text-black border-purple-700 border-2 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    )
                })
            }
        </div>
    );
}