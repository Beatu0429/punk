import { useState } from 'react';

export default function Pagination( { perPage, onPageChange, currentPage, totalPages, onPerPageChange } ){

    const [itemsPerPage, setItemsPerPage] = useState(perPage);
    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePerPageChange(e) {
        setItemsPerPage(parseInt(e.target.value, 10));
    }

    function handlePaginationClick() {
        onPerPageChange(itemsPerPage, pageNumber);
        onPageChange(itemsPerPage, pageNumber);
    }

    function handlePageNumberChange(e) {
        setPageNumber(parseInt(e.target.value, 10));
      }

    return(
        <div>
            <label htmlFor="itemsPerPage">Items per Page:</label>
            <input
            type="number"
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handlePerPageChange}/>
            <label htmlFor="pageNumber">Page Number:</label>
            <input
                type="number"
                id="pageNumber"
                value={pageNumber}
                onChange={handlePageNumberChange}
            />
            <button onClick={handlePaginationClick}>Go</button>
        </div>
    )
}