const axios = require("axios")


async function teamsControllers(){
    let allTeams = [];

    const { data } = await axios.get("http://localhost:5000/drivers");
  
    if (data) {
      data.forEach(driver => {
        if (driver.teams) {
          allTeams.push(driver.teams);
        }
      });
      const arraySeparado = allTeams.flatMap(cadena => cadena.split(',').map(t => t.trim()));
      const equiposUnicos = new Set(arraySeparado);
      const arrayEquiposUnicos = [...equiposUnicos];

      const arrayOrdenado = arrayEquiposUnicos.sort((a,b) => a.localeCompare(b))
  
      return arrayOrdenado;
    
    
    
    
    } else {
      throw new Error("No hay datos");
    }
  }
1  


 module.exports = teamsControllers





