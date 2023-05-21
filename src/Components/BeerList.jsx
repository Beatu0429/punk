import { useState, useEffect } from 'react';
import axios from 'axios';
import './BeerList.css'
import Options from './Options';
import BeerItem from './BeerItem';
import Pagination from './Pagination';


function BeerList() {
    const [beers, setBeers] = useState([]);
    const [sortingOption, setSortingOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [totalPages, setTotalPages] = useState(1);

  
    useEffect(() => {
        axios.get(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${itemsPerPage}`)
          .then(response =>  {
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
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [sortingOption, currentPage, itemsPerPage]);

      const handlePageChange = (perPage, pageNumber) => {
        setCurrentPage(pageNumber); 
        setItemsPerPage(perPage);
      };
      
  
      return (
        <>
        <Options sortingOption={sortingOption} setSortingOption={setSortingOption}></Options>
        <Pagination perPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPerPageChange={handlePageChange}
        onPageChange={handlePageChange}></Pagination>
        <div className='list-card'>
          {beers.map( beer => (
            <BeerItem beer={beer} key={beer.id}></BeerItem>
            ))}
            </div>
        </>
      );
      
  }
  
  export default BeerList;