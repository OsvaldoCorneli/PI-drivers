import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './views/landingpage/LandingPage';
import Home from './views/home/Home';
import { useDispatch} from 'react-redux';
import {loadTeams} from './redux/actions/actions.js'
import Detail from './views/Detail/Detail';
import Nav from './components/Nav/Nav';
import { useState } from 'react';
import Form from './views/Form/Form';
import "./App.css"

function App() {

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQueryLocal, setSearchQueryLocal] = useState("");

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTeams());
  }, []);
  


  return (
    <>
       {location.pathname !== "/" ? <Nav setSearchQueryLocal={setSearchQueryLocal} searchQueryLocal={searchQueryLocal} currentPage={currentPage} setCurrentPage={setCurrentPage}/>:null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home setSearchQueryLocal={setSearchQueryLocal} searchQueryLocal={searchQueryLocal}  currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
        <Route path = {`/detail/:id`} element = {<Detail  currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
        <Route path='/create' element={<Form/>}/>
      </Routes>

      {location.pathname !== "/" ? <footer>Proyecto individual - Drivers - Soy HENRY 2023 - Cohorte 42a - Osvaldo Matias Corneli Nassif</footer> : null}
    </>
  );
}

export default App;




