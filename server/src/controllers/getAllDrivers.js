const axios = require("axios")
const {Driver, Teams} = require("../db");
// const fotos = require('./fotos.json')

async function getAllDrivers() {

  
  let {data} = await axios.get("http://localhost:5000/drivers")
  let dataDB = await Driver.findAll()
  
 ;
  if (!data && !dataDB) { 
      throw new Error("No hay conductores");
  }
  
    
      for (let i = 0; i < data.length; i++) {
        if (data[i].image.url === '' && data[i].image.imageby === '') {
          data[i].image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png";
          data[i].image.imageby = "Image by 1000 marcas";
        }
      }
     

      let dbDrivers = [];

for (const dbDriver of dataDB) {
  const teams = await funcionparaencontrarteams(dbDriver.id);

  dbDrivers.push({
    id: dbDriver.id,
    name: dbDriver.name,
    image: dbDriver.image, 
    dob: dbDriver.dob,
    nationality: dbDriver.nationality,
    teams: teams,
    description: dbDriver.description,
  });
}

      const dbDriversApi = data.map((dbDriver) => ({
        id: dbDriver.id,
        name: dbDriver.name,
        image: dbDriver.image,
        dob: dbDriver.dob,
        nationality: dbDriver.nationality,
        teams: dbDriver.teams,
        description: dbDriver.description,
      }));

    
  return dbDriversApi.concat(dbDrivers);
}

async function funcionparaencontrarteams(driverId) {
  try {
    const driver = await Driver.findByPk(driverId, {
      include: {
        model: Teams,
        through: 'driver_team',
      },
    });

    if (driver && driver.Teams) {
      return driver.Teams.map(team => team.name).join(",");
    } else {
      console.error('No se encontraron equipos para el conductor con ID:', driverId);
      return [];
    }
  } catch (error) {
    console.error('Error al buscar equipos:', error);
    return [];
  }
}

module.exports = {getAllDrivers,funcionparaencontrarteams};