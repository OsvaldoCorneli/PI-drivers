
import React, { useState } from "react";
import { filterApiDb, filterTeam } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import "./Filter.css"

export default function Filters(props) {
  const { teams, searchQueryLocal,setCurrentPage} = props;
  const dispatch = useDispatch();
  
  

  const handleFilter = (event) => {
   
      dispatch(filterTeam(event.target.value))
      setCurrentPage(0) 
  };

  const handleFilterApiDb = (event) => {
    
      dispatch(filterApiDb(event.target.value))
      setCurrentPage(0)
  };

  return (
    <div className="filters-contener">
      <div>
        <p className="name.filter">Filtrar team</p>
        <select
          name="filter"
          style={{ margin: "auto", display: "block" }}
          onChange={handleFilter}
          disabled={searchQueryLocal !== "" || location.pathname !== "/home"}
        >
          <option value="reset">...</option>
          {teams
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((team) => (
              <option value={team.name} key={team.id}>
                {team.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <p className="name.filter">Filtrar API/DB</p>
        <select
          name="APIDBfilter"
          onChange={handleFilterApiDb}
            disabled={searchQueryLocal !== "" || location.pathname !== "/home"}
          style={{ margin: "auto", display: "block" }}
        >
          <option value="reset">...</option>
          <option value="api">Api</option>
          <option value="db">Data Base</option>
        </select>
      </div>
    </div>
  );
}