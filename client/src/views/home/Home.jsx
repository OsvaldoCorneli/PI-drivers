// home.jsx

import React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  driverState,
  loadTeams,
  clearDetail,
} from "../../redux/actions/actions";
import Card from "../../components/Card/Card";
import Pagination from "../../helpers/paginado";
import Order from "../../components/Order/Order";
import "./home.css";
import { Link } from "react-router-dom";

function Home({
  currentPage,
  setCurrentPage,
  searchQueryLocal,
}) {

  //<ESTADOS>
  const dispatch = useDispatch();
  const detail = useSelector((state)=>state.detailsId)
  const allDrivers = useSelector((state) => state?.allDrivers);
  const driversByName = useSelector((state) => state.driversByName);
  const driversRender = useSelector((state) => state.drivers);
  const teams = useSelector((state) => state?.teams);


  //</ESTADOS>
  
  useEffect(() => {
    if (teams.length > 203 || teams.length === 0) {
      dispatch(loadTeams());
    }
   if(Object.keys(detail).length === 0){
    dispatch(getDrivers());
  }
  }, []);

  // <Paginado>
  const driversPerPage = 9;

  const startIndex = currentPage * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  useEffect(() => {
    if (driversByName.length !== 0) {
      dispatch(driverState(driversByName));
      setCurrentPage(0);
      if(detail.length !== 0 && searchQueryLocal.length !== 0){
        dispatch(clearDetail())
      }
    } else {
      if (driversRender && detail.length === 0) {
        
        dispatch(driverState(allDrivers));
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
const empty = {
  id: 0,
  name:{forename: "NO HAY", surname: "COINCIDENCIAS"},
  image:{url: "https://img.freepik.com/vector-premium/icono-perfil-humano-ilustracion-vectorial-genero_276184-158.jpg?w=740"}
} 

  // </Paginado>
 
  return (
<div className="body-background">
  <div className="selects-contener">
      <Order
        setCurrentPage={setCurrentPage}
        searchQueryLocal={searchQueryLocal}
      />

      
      </div>
      {driversRender === "vacio" ? (
        <div className="ordenar">
        <Card 
        keyy={empty.id}
        name={empty.name}
        image={empty.image}
        />
        </div>
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
