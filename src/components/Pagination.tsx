import React, { useState } from "react";

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleNext = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            onPageChange(nextPage);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            onPageChange(prevPage);
        }
    };

    const pageNumbers = [currentPage, currentPage + 1].filter(
        (page) => page <= totalPages
    );

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`px-4 py-2 rounded font-bold ${currentPage === 1 ? "cursor-not-allowed" : ""
                    }`}
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 rounded font-bold ${page === currentPage ? "bg-primaryColor text-white" : "bg-cardColor"
                        }`}
                    onClick={() => {
                        setCurrentPage(page);
                        onPageChange(page);
                    }}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-2 rounded  font-bold ${currentPage === totalPages ? " cursor-not-allowed" : ""
                    }`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
