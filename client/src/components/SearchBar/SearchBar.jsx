     
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverState, getDriverByName} from '../../redux/actions/actions';


function SearchBar({searchQueryLocal, setSearchQueryLocal}) { 
  //<Estados> 
  const dispatch = useDispatch();
  
  const alldriver = useSelector(state => state?.allDrivers) 
  const driver = useSelector(state => state?.drivers)
  let query = searchQueryLocal; 
  //<Estados/>

  
  useEffect(()=>{
    if(driver.length > 15){
    setSearchQueryLocal('')}
  },[driver])
  
  
  useEffect(()=>{
    if(searchQueryLocal === ''){
      dispatch(driverState(alldriver))
    }
    else{
      dispatch(getDriverByName(searchQueryLocal));
    }
  },[searchQueryLocal, alldriver])
  
  //<Funciones>
  const onSearch = (event) => {
   setSearchQueryLocal(event.target.value);
  };

  //<Funciones/>

  return (
    <div>
      <input
        type='search'
        placeholder='Search Drivers'
        value={searchQueryLocal}
        onChange={onSearch}
      />
    </div>
  );
}

export default SearchBar;