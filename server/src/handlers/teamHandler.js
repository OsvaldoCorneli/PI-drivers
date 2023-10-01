const teamsControllers = require("../controllers/teamsControllers");
const {Teams} = require("../db")

async function teamsHandler(req, res){

    try {
      const count = await Teams.count();
      console.log(count)
      if(count === 0){
        const teams = await teamsControllers();
        
        if (teams && teams.length > 0) {
          for (const team of teams) {
            await Teams.create({ name: team });
          }
    
          return res.status(200).json({ message: "Equipos creados correctamente", teams });
        } else {
          return res.status(400).json({ error: "No se encontraron equipos" });
        }}
        else{ return res.status(200).json({message: "La base de datos ya esta cargada"})
  
      }} catch (error) {
    return res.status(500).send(error);
  }

}

module.exports = teamsHandler