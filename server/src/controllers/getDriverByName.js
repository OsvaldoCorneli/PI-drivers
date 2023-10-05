const { Driver } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

async function getDriverByName(name) {
  const varName = deleteAccent(name.toLowerCase());
  let driversfiltered = [];

  // Obtener datos de la API externa
  const { data } = await axios.get("http://localhost:5000/drivers");

  if (data) {
    driversfiltered = data.filter((driver) => {
      const fullName = `${deleteAccent(driver.name.forename.toLowerCase())} ${deleteAccent(driver.name.surname.toLowerCase())}`;
      return fullName.includes(varName);
    });
  }

  // Obtener datos de la base de datos
  const dbData = await Driver.findAll({
    where: {
      name: {
        forename: {
          [Op.iLike]: `${varName}%`,
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

  // Combinar y limitar la cantidad de resultados
  const combinedData = [...driversfiltered, ...dbDrivers].slice(0, 15);

  return combinedData;
}

function deleteAccent(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = getDriverByName;
