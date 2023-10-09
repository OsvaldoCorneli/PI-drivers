// home.jsx

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  driverState,
  loadTeams,
} from "../../redux/actions/actions";
import Card from "../../components/Card/Card";
import Pagination from "../../helpers/paginado";
import Filters from "../../components/FIlters/Filters";
import Order from "../../components/Order/Order";
import "./home.css";
import { Link } from "react-router-dom";

function Home({
  currentPage,
  setCurrentPage,
  setSearchQueryLocal,
  searchQueryLocal,
}) {
  //<ESTADOS>
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state?.allDrivers);
  const driversByName = useSelector((state) => state.driversByName);
  const driversRender = useSelector((state) => state.drivers);
  const teams = useSelector((state) => state?.teams);

  //</ESTADOS>

  useEffect(() => {
    if (teams.length > 203 || teams.length === 0) {
      dispatch(loadTeams());
    }

    dispatch(getDrivers());
  }, []);

  // <Paginado>
  const driversPerPage = 9;

  const startIndex = currentPage * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (driversByName.length !== 0) {
      dispatch(driverState(driversByName));
      setCurrentPage(0);
    } else {
      if (driversRender) {
        setLoading(false);
        dispatch(driverState(allDrivers));
        // setCurrentPage(0);
      } else {
        setLoading(true);
      }
    }
  }, [allDrivers, driversByName]);

  const drivesPaginado = driversRender.slice(startIndex, endIndex);

  const nextHandler = () => {
    if (endIndex < driversRender.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // </Paginado>

  return (
<div className="body-background">
  <div className="selects-contener">
      <Order
        setCurrentPage={setCurrentPage}
        searchQueryLocal={searchQueryLocal}
      />

       <Filters teams={teams} 
      searchQueryLocal={searchQueryLocal} 
      setCurrentPage={setCurrentPage}
      driversRender={driversRender}/>

      </div>
      {driversRender === "vacio" ? (
        <h2>NO HAY COINCIDENCIAS</h2>
      ) : driversRender.length !== 0 ? 
      <div className="pagina-contener">
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(driversRender.length / driversPerPage)}
          onPrev={prevHandler}
          onNext={nextHandler}
        />
      </div> : null}

      <div className="ordenar">
        {driversRender !== "vacio"
          ? drivesPaginado.map((drive) => (
              <Link to={`/detail/${drive.id}`} key={drive.id}>
                <Card
                  key={drive.id}
                  id={drive.id}
                  name={drive.name}
                  image={drive.image}
                  teams={drive.teams}
                />
              </Link>
            ))
          : ""}
      </div>
      <br/>

      {driversRender.length !== 0 && driversRender !== "vacio" ? 
      <div className="pagina-contener">
        <Pagination className="pagina-contener"
          currentPage={currentPage}
          totalPages={Math.ceil(driversRender.length / driversPerPage)}
          onPrev={prevHandler}
          onNext={nextHandler}
        />
      </div> : null }
    </div>
  );
}

export default Home;
