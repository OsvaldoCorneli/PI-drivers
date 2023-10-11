import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverState, getDriverByName } from '../../redux/actions/actions';
import './SearchBar.css'; 

function SearchBar({ searchQueryLocal, setSearchQueryLocal, onSearch }) {

  const dispatch = useDispatch();
  const alldriver = useSelector((state) => state.allDrivers);
  const driver = useSelector((state) => state.drivers);


  useEffect(() => {
    if (driver.length > 15) {
      setSearchQueryLocal('');
    }
  }, [driver]);

  useEffect(() => {
    if (searchQueryLocal.length !== 0 && searchQueryLocal !== ' ') {
      dispatch(getDriverByName(searchQueryLocal));
    } else {
      dispatch(driverState(alldriver));
      dispatch(getDriverByName([]));
    }
  }, [searchQueryLocal, dispatch, alldriver]);

  return (
    <div className="search-bar-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search Drivers"
        value={searchQueryLocal}
        onChange={onSearch}
      />
    </div>
  );
}

export default SearchBar;
