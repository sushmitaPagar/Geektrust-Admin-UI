import React, { useEffect, useState } from "react";
import config from "../Services/ConfigFile";
import "../css/PagingComponent.css";

const PagingComponent = ({ filteredAdminList, pageNumber, handlePageChange }) => {

    const [pages, setPages] = useState([]);

    const lastPageNumber = Math.ceil(filteredAdminList.length / config.pageSize);

    useEffect(() => {
        // Create an array for page numbers
        let pgs = [];
        for(let i=1; i<=lastPageNumber; i++){
                pgs.push(i);
        }

        setPages(pgs);

    }, [filteredAdminList]);

    return (
        <div>
            {/* First page button */}
            <button 
                className={pageNumber === 1 ? "disabledPageBtn pageBtn" : "pageBtn"}
                onClick={() => handlePageChange(1)}>
                    <i className="fas fa-duotone fa-angles-left"></i>
            </button>
            {/* Previous page button */}
            <button 
                className={pageNumber === 1 ? "disabledPageBtn pageBtn" : "pageBtn"}
                onClick={() => handlePageChange(pageNumber-1)}>
                    <i className="fas fa-duotone fa-angle-left"></i>
            </button>
            {/* All page number buttons */}
            {pages.map((page) => {
                return (
                    <button 
                        key={page}
                        className={page === pageNumber ? "intermediateBtnActv pageBtn" : "pageBtn"}
                        onClick={() => handlePageChange(page)}>{page}</button>
                )
            })}
            {/* Next page button */}
            <button 
                className={pageNumber === lastPageNumber ? "disabledPageBtn pageBtn" : "pageBtn"}
                onClick={() => handlePageChange(pageNumber+1)}>
                    <i className="fas fa-duotone fa-angle-right"></i>
            </button>
            {/* Last page button */}
            <button 
                className={pageNumber === lastPageNumber ? "disabledPageBtn pageBtn" : "pageBtn"}
                onClick={() => handlePageChange(lastPageNumber)}>
                    <i className="fas fa-duotone fa-angles-right"></i>
            </button>
        </div>
    );
};

export default PagingComponent;