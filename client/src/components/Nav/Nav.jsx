import React from "react";
import { useDispatch , useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDriverByName } from "../../redux/actions/actions";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../FIlters/Filters";

import "./Nav.css"; // Importa el archivo CSS

export default function Nav({
  currentPage,
  setCurrentPage,
  setSearchQueryLocal,
  searchQueryLocal,
}) {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state?.teams);

  function handlerHome() {
    setCurrentPage(0);
    dispatch(getDriverByName([]));
  }

  const onSearch = (event) => {
    setSearchQueryLocal(event.target.value);
  };

  return (
    <div className="navbar">
       
      <NavLink to="/home" className="nav-link" onClick={handlerHome}>
        Home
      </NavLink>

      
      <NavLink to="/create" className="nav-link">
        Create
      </NavLink>

      <SearchBar
        searchQueryLocal={searchQueryLocal}
        setSearchQueryLocal={setSearchQueryLocal}
        onSearch={onSearch}
      />

        <NavLink to="/about" className="nav-link">
        About
      </NavLink>
    </div>
  );
}
