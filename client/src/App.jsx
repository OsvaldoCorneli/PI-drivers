import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './views/landingpage/LandingPage';
import Home from './views/home/Home';
import SearchBar from './components/SearchBar/SearchBar';
import { useSelector, useDispatch} from 'react-redux';
import {loadTeams} from './redux/actions/actions.js'
function App() {

  const location = useLocation();
  

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTeams());
  }, []);
  
  


  return (
    <>
     
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;




