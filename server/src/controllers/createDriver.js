const { Driver } = require("../db");

async function createDriver( name, image, dob, nationality, teams, description) {
  try {
    const createdDriver = await Driver.create({
      name,
      image,
      dob,
      nationality,
      teams,
      description,
    });
  
    if (createdDriver) {
      const response = {
        status: 200,
        message: "Creado correctamente",
        driver: {
          id: createdDriver.id,
          name: createdDriver.name,
          image: createdDriver.image,
          dob: createdDriver.dob,
          nationality: createdDriver.nationality,
          description: createdDriver.description,
        },
      };
      return response;
    } else {
      return { status: 404, message: "No fue creado" };
    }
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    return { status: 500, message: "Error en el servidor" };
  } 
} 

module.exports = createDriver;
 