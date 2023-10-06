import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDrivers , driverState, loadTeams, order, filterTeam} from "../../redux/actions/actions";
import Card from '../../components/Card/Card';
import Pagination from '../../helpers/paginado'

import "./home.css"
import SearchBar from '../../components/SearchBar/SearchBar';

function Home() {
  //<ESTADOS>
  const allDrivers = useSelector(state => state?.allDrivers) 
  const driversByName = useSelector(state => state.driversByName) 
  const driversRender = useSelector(state => state.drivers)
  const teams = useSelector(state => state?.teams)
  const dispatch = useDispatch();
  const [searchQueryLocal, setSearchQueryLocal] = useState('');
  //</ESTADOS>

  useEffect(() => {
  dispatch(loadTeams())
  dispatch(getDrivers())
  }, []);
  
  // <Paginado>
  const driversPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const [loading, setLoading] = useState(true) 

  
  useEffect(() => {

  if(driversByName.length !== 0){
   dispatch(driverState(driversByName))
   setCurrentPage(0);
   }
 else{
  if(driversRender){
  setLoading(false)
  dispatch(driverState(allDrivers))
  setCurrentPage(0)

  }else{setLoading(true)}
 }

 }, [allDrivers, driversByName]);

  const drivesPaginado = driversRender.slice(startIndex, endIndex);

  const nextHandler = () => {
    if (endIndex < driversRender.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0,0);
    }
  };

  const prevHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0,0);
    }
  };

   // </Paginado>
  //<Ordenamiento>
  const [aux, setAux] = useState(false)

  const handleOrder = (event) => {
     dispatch(order(event.target.value))
     setCurrentPage(0)
     if(aux){
      setAux(false)
    }else{setAux(true)}
  }

  const handleFilter = (event) =>{
    dispatch(filterTeam(event.target.value))
  
    }

  //<Ordenamiento/>


  
  
  
  return (
    <div>

        <h1>DRIVERS HOME</h1>
       <SearchBar searchQueryLocal={searchQueryLocal} setSearchQueryLocal={setSearchQueryLocal}/>
    {loading ? <h2>"LOADING"</h2> : driversRender === "vacio" ? <h2>NO HAY COINCIDENCIAS</h2> : driversRender.length !== 0? (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(driversRender.length / driversPerPage)}
            onPrev={prevHandler}
            onNext={nextHandler}
          />
        ):""}


<select name="filter" style={{ margin: "auto", display: "block" }} onChange={handleFilter} disabled={searchQueryLocal !== ""}>
  <option value="reset">Reset</option>
  {teams.map(team => (
    <option value={team.name} key={team.id}>
      {team.name}
    </option>
  ))}
</select>

<select name="ordenar" onChange={handleOrder} disabled={searchQueryLocal !== ""}>
   <option value="reset">Reset</option>
  <option value="ascendente">A-Z</option>
  <option value="descendente">Z-A</option>
  <option value="nacimientoa">Nacimiento ascendente</option>
  <option value="nacimientod">Nacimiento descendente</option>
</select>
  
        <div className='ordenar'>
          {driversRender != "vacio" ? drivesPaginado.map((drive) => (
            <Card
              key={drive.id}
              id={drive.id}
              name={drive.name}
              image={drive.image}
              teams={drive.teams}
            />
          )):""}
        </div>
  
        {driversRender.length !== 0 && driversRender !== "vacio" ? (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(driversRender.length / driversPerPage)}
            onPrev={prevHandler}
            onNext={nextHandler}
          />
        ) : 
          ""
        }

      </div>
    );
  }

export default Home;