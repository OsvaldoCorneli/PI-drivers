import React from "react";
import { useDispatch , useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearDetail, driverState, getDriverByName } from "../../redux/actions/actions";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../FIlters/Filters";

import "./Nav.css"; 

export default function Nav({
  setCurrentPage,
  setSearchQueryLocal,
  searchQueryLocal,
}) {
  const dispatch = useDispatch();
  const teams = useSelector(state=>state.teams)
  const allDrivers = useSelector(state=>state.allDrivers)

  function handlerHome() {
    dispatch(driverState(allDrivers))
    dispatch(clearDetail())
    setCurrentPage(0);
    dispatch(getDriverByName([]));
  }

  const onSearch = (event) => {
    setSearchQueryLocal(event.target.value);
  };

  return (
    <div className="navbar">
     
     
      <NavLink to={"/home"}  className="nav-link" onClick={handlerHome}>
        Home
      </NavLink>
       
       <SearchBar
        searchQueryLocal={searchQueryLocal}
        setSearchQueryLocal={setSearchQueryLocal}
        onSearch={onSearch}
      />


      
     
      
      <NavLink to="/create" className="nav-link">
        Create
      </NavLink>

   
        <NavLink to="/about" className="nav-link">
        About
      </NavLink>

      <Filters teams={teams} 
      searchQueryLocal={searchQueryLocal} 
      setCurrentPage={setCurrentPage}/>

    </div>
  );
}
