import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers , driverState} from "../../redux/actions/actions";
import Card from '../../components/Card/Card';
import Pagination from '../../helpers/paginado'

import "./home.css"

function Home() {

  const dispatch = useDispatch();
  const drivers1 = useSelector(state => state.copyDrivers) 
  const driversByName = useSelector(state => state.driversByName) 
  const drivers = useSelector(state => state.drivers)
  // <Paginado>
  const driversPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * driversPerPage;
  const endIndex = startIndex + driversPerPage;
  const [loading, setLoading] = useState(true) 
  
  useEffect(() => {
    if(drivers !== "vacio"){
    dispatch(getDrivers())}
  }, [dispatch]);
  
useEffect(() => {

 if(driversByName.length !== 0){
   dispatch(driverState(driversByName))
   setCurrentPage(0);
   }
 else{
  if(drivers){
  setLoading(false)
  dispatch(driverState(drivers1))
  setCurrentPage(0)
  }else{setLoading(true)}
 }
 }, [drivers1, driversByName]);

  const drivesPaginado = drivers.slice(startIndex, endIndex);

  const nextHandler = () => {
    if (endIndex < drivers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  

   // </Paginado>


 
   
    return (
      <div>
        <h1>DRIVERS HOME</h1>
    {loading ? <h2>"LOADING"</h2>: drivers.length !== 0 && drivers !== "vacio" ? (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(drivers.length / driversPerPage)}
            onPrev={prevHandler}
            onNext={nextHandler}
          />
        ) : (
          <h2>No hay coincidencias</h2>
        )}
  
        <div className='ordenar'>
          {drivers != "vacio" ? drivesPaginado.map((drive) => (
            <Card
              key={drive.id}
              id={drive.id}
              name={drive.name}
              image={drive.image}
              teams={drive.teams}
            />
          )):""}
        </div>
  
        {drivers.length !== 0 && drivers !== "vacio" ? (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(drivers.length / driversPerPage)}
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