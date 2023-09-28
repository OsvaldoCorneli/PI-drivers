const axios = require("axios")
const {Driver} = require("../db");


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
  
      const dbDrivers = dataDB.map((dbDriver) => ({
        id: dbDriver.id,
        name: dbDriver.name,
        image: dbDriver.image,
        dob: dbDriver.dob,
        nationality: dbDriver.nationality,
        description: dbDriver.description,
      }));
    
  return data.concat(dbDrivers);
}



module.exports = getAllDrivers;