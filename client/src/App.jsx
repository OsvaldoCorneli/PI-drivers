import { Routes, Route } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import LandingPage from './views/landingpage/LandingPage';
import Home from './views/home/Home';
import SearchBar from './components/SearchBar/SearchBar';

// import './App.css'

function App() {
  const location = useLocation();
  

  return (
    <>
       
      {location.pathname !== "/" ? <SearchBar/>:""}
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </>
  );

}

export default App
