const {Driver} = require("../db");
const axios = require("axios")
const { Op } = require("sequelize");

async function getDriverByName(name){
    let driversfiltered = [];
  const varName = deleteAccent(name.toLowerCase());

    const { data } = await axios.get("http://localhost:5000/drivers");

    if (data) {
      for (let i = 0; i < data.length; i++) {
        const nameLowerCase = data[i].name.forename.toLowerCase();
        const sinacento = deleteAccent(nameLowerCase);
  
        if (sinacento.startsWith(varName)) {
          driversfiltered.push(data[i]);
        }
      }
    }
  
    const dbData = await Driver.findAll({
      where: {
        name: {
          forename: {
            [Op.iLike]: `${varName}%`, // Busca nombres que comiencen con la letra especificada
          },
        },
      },
    });

    const dbDrivers = dbData.map((dbDriver) => ({
        id: dbDriver.id,
        name: dbDriver.name,
        image: dbDriver.image,
        dob: dbDriver.dob,
        nationality: dbDriver.nationality,
        teams: dbDriver.teams,
        description: dbDriver.description,
      }));

   
    const combinedData = driversfiltered.concat(dbDrivers).slice(0, 15);
    return combinedData;
  }

  function deleteAccent(text) {
    return text
      .normalize("NFD") // Normaliza la cadena con la forma de Unicode (NFD)
      .replace(/[\u0300-\u036f]/g, ""); // Elimina los caracteres diacríticos (acentos)
  }

  module.exports = getDriverByName;

