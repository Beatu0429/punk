import { useLocation, useNavigate } from 'react-router-dom';
import './Options.css'

export default function Options( { sortingOption, setSortingOption } ){

    const location = useLocation();
    const navigate = useNavigate();

    function handleSortingOptionChange(e){
        const option = e.target.value;
        setSortingOption(option);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('sort', option);
        navigate({ search: queryParams.toString() });
      }

    return(
        <div className='box'>
            <select value={sortingOption} onChange={handleSortingOptionChange}>
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="first_brewed">First Brewed</option>
            </select>
        </div>
    )
}