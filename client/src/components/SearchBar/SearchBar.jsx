     
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverState, getDriverByName} from '../../redux/actions/actions';


function SearchBar() { 
  //<Estados> 
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const drivers1 = useSelector(state => state?.allDrivers) 
  //<Estados/>

  useEffect(()=>{
     
    if(searchQuery?.trim() === ''){
      dispatch(driverState(drivers1))
    }
    else{
      dispatch(getDriverByName(searchQuery));
    }
  },[searchQuery])
  
  //<Funciones>
  const onSearch = (event) => {
   setSearchQuery(event.target.value);
  };

  //<Funciones/>

  return (
    <div>
      <input
        type='search'
        placeholder='Search Drivers'
        value={searchQuery}
        onChange={onSearch}
      />
    </div>
  );
}

export default SearchBar;