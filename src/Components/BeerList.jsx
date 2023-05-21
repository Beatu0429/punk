import { useState, useEffect } from 'react';
import axios from 'axios';
import './BeerList.css'
import Options from './Options';
import BeerItem from './BeerItem';
import Pagination from './Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BeerList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortingOptionFromURL = queryParams.get('sort');
  const currentPageFromURL = parseInt(queryParams.get('page'), 10);
  const itemsPerPageFromURL = parseInt(queryParams.get('per_page'), 10);

  const [beers, setBeers] = useState([]);
  const [sortingOption, setSortingOption] = useState(sortingOptionFromURL || '');
  const [currentPage, setCurrentPage] = useState(currentPageFromURL || 1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromURL || 25);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.punkapi.com/v2/beers`, {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          ...(sortingOption && { sort: sortingOption })
        }
      })
      .then((response) => {
        const beers = response.data;
        let sortedBeers = [...beers];

        if (sortingOption === 'name') {
          sortedBeers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortingOption === 'first_brewed') {
          sortedBeers.sort((a, b) => a.first_brewed.localeCompare(b.first_brewed));
        }

        setBeers(sortedBeers);
        setTotalPages(response.headers['x-total-pages']);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [sortingOption, currentPage, itemsPerPage]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('sort', sortingOption);
    newSearchParams.set('page', currentPage);
    newSearchParams.set('per_page', itemsPerPage);
    navigate(`?${newSearchParams.toString()}`);
  }, [sortingOption, currentPage, itemsPerPage, navigate]);

  function handlePageChange(perPage, pageNumber) {
    setCurrentPage(pageNumber);
    setItemsPerPage(perPage);
  }

  return (
    <>
      <Options sortingOption={sortingOption} setSortingOption={setSortingOption} />
      <Pagination
        perPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPerPageChange={handlePageChange}
        onPageChange={handlePageChange}
      />
      <div className="list-card">
        {beers.map((beer) => (
          <BeerItem beer={beer} key={beer.id} />
        ))}
      </div>
    </>
  );
}


