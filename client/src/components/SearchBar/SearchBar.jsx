     
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverState, getDriverByName} from '../../redux/actions/actions';


function SearchBar() {
   
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const drivers1 = useSelector(state => state.copyDrivers) 

  
  const onSearch = (event) => {
   setSearchQuery(event.target.value);
  };

  const onClickSearch = () => {
    
      if(searchQuery !== ""){
        dispatch(getDriverByName(searchQuery));
        // setSearchQuery('')
      }
      else{
        dispatch(driverState(drivers1))
      }
  };

  return (
    <div>
      <input
        type='search'
        placeholder='Search Drivers'
        value={searchQuery}
        onChange={onSearch}
      />
      <button onClick={onClickSearch()}>Buscar</button>

      
    </div>
  );
}

export default SearchBar;