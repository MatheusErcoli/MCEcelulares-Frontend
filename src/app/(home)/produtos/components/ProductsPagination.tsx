'use client';

import { ProductCard } from "@/src/components/common/ProductCard";
import { useState } from "react";
import { Pagination } from "./Pagination";

type ProductsPaginationProps = {
    products: ProductType[];
}

type ProductType = {
    id: string | number
    name: string;
    price: number;
    image: string;
}

const ProductsPagination = ({ products }: ProductsPaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(20)

    const lastPointedIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPointedIndex - postsPerPage;
    const currentPost = products.slice(firstPostIndex, lastPointedIndex)

    return (
        <div className="container mx-auto pt-20 pb-5 px-30">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {currentPost.map((p, index) => (
                    <ProductCard
                        key={`${p.id}-${index}`}
                        name={p.name}
                        image={p.image}
                        price={p.price}
                    />
                ))}
            </div>

            <Pagination
                totalPosts={products.length}
                postPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ProductsPagination;