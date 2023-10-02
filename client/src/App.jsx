import { useEffect, useState } from 'react'
import axios from "axios";
// import './App.css'

function App() {

  const [miEstado, setMiEstado] = useState([]);

  const obtenerDatos = async () => {
   
      const response = await axios.get("http://localhost:3001/drivers");
      
      setMiEstado(response.data);

      console.log(response)
   
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return ( 
      <>
        {miEstado.length ? (
          miEstado.map((driver) => (
            <div key={driver.id}>
              <h2>{driver.name?.forename}</h2>
              <h2>{driver.name?.surname}</h2>
              <img src={driver.image?.url} alt={`Imagen de ${driver.name?.forename}`} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
   }

export default App
