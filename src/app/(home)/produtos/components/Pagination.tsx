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

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="flex justify-center gap-2 mt-8 mb-8">
            {
                pages.map((page, index)=> {
                    return (
                        <button 
                            key={index} 
                            onClick={() => handlePageClick(page)} 
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