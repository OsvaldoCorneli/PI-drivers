const { Driver, Teams } = require("../db");

async function createDriver( name, image, dob, nationality, teams, description) {
  
    const [createdDriver, created] = await Driver.findOrCreate({where: {
      name,
      image,
      dob,
      nationality,
      description, 
    }});

    if (created) {
        const separateTeams =  teams.split(",");

      for (const teamName of separateTeams) {
    
        const [team] = await Teams.findOrCreate({ where: { name: teamName } });
    
        await createdDriver.addTeam(team);
      }
   
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
          teams: createdDriver.teams,
          description: createdDriver.description,
        },
      };
      return response;
    } else {
      return { status: 404, message: "No fue creado" };
    }
  
} 
 else{ throw new Error( "El drivers con esos datos ya existe")}
}
module.exports = createDriver;
 