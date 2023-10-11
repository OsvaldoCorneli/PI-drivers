const { Driver } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { funcionparaencontrarteams } = require("./getAllDrivers");

async function getDriverByName(name) {
  const varName = deleteAccent(name.toLowerCase());

  try {
    // Obtener datos de la API externa
    const { data: apiData } = await axios.get("http://localhost:5000/drivers");

    const driversfiltered = apiData.filter((driver) => {
      const fullName = `${deleteAccent(driver.name.forename.toLowerCase())} ${deleteAccent(driver.name.surname.toLowerCase())}`;
      return fullName.includes(varName);
    });
 
    const dbData = await Driver.findAll({     
      where: {   
        name: {  
          forename: {    
            [Op.iLike]: `${varName}%`,
          },
        }, 
      },
    });

    const dbDrivers = [];
    for (const dbDriver of dbData) {
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

    const combinedData = [...driversfiltered, ...dbDrivers].slice(0, 15);

    return combinedData;
  } catch (error) {
    console.error("Error en la obtención de datos:", error);
    throw error;
  }
}

function deleteAccent(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = getDriverByName;
