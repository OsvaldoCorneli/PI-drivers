const axios = require("axios")
const getDriversById = require("./getDriversById")
const {Driver} = require("../db");
const { Op } = require("sequelize");

async function getAllDrivers(name) {

  let driversfiltered = [];
  let {data} = await axios.get("http://localhost:5000/drivers")
  let dataDB = await Driver.findAll()
 ;
  if (!data && !dataDB) {
      throw new Error("No hay conductores");
  }
  
  if (name) {
    const varName = deleteAccent(name.toLowerCase());

    for (let i = 0; i < data.length; i++) {
      const nameLowerCase = data[i].name.forename.toLowerCase();
      const sinacento = deleteAccent(nameLowerCase);

      if (sinacento.startsWith(varName)) {
        driversfiltered.push(data[i]);
      }
    }

    if (dataDB) {
      const drivers = await Driver.findAll({
        where: {
          name: {
            forename: {
              [Op.iLike]: `${varName}%`, // Busca nombres que comiencen con la letra especificada
            },
          },
        },
      });  
     
      data = driversfiltered.concat(drivers).slice(0, 15);
    }
  }
    
      for (let i = 0; i < data.length; i++) {
        if (data[i].image.url === '' && data[i].image.imageby === '') {
          data[i].image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png";
          data[i].image.imageby = "Image by 1000 marcas";
        }
      }

  return data;
}


function deleteAccent(text) {
  return text
    .normalize("NFD") // Normaliza la cadena con la forma de Unicode (NFD)
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los caracteres diacríticos (acentos)
}



module.exports = getAllDrivers;