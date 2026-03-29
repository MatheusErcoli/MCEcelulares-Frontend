'use client';

import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { ProductCard } from "@/src/components/ProductCard";
import { getPaginatedProducts } from "@/src/actions/products";

const ProductsPagination = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    
    const [error, setError] = useState<string | null>(null);

    const postsPerPage = 20;

    const loadProducts = async (page: number) => {
        setError(null);

        const response = await getPaginatedProducts(page, postsPerPage);

        if (!response.success) {
            setError(response.error);
        } else {
            setProducts(response.products); 
            setTotalPages(response.totalPages);
            setTotalItems(response.total);
        }

    };

    useEffect(() => {
        loadProducts(currentPage);
    }, [currentPage]);

    return (
        <div className="container mx-auto pt-20 pb-5 px-30">
        {error && (
          <p className="text-center font-medium text-red-600 animate-pulse">
            {error}
          </p>
        )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                    <ProductCard key={p.id_produto} product={p}/>
                ))}
            </div>

            <Pagination
                totalPosts={totalItems} 
                postPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ProductsPagination;