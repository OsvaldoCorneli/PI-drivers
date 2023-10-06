const teamsControllers = require("../controllers/teamsControllers");
const {Teams} = require("../db")

async function teamsHandler(req, res){

    try {
      const count = await Teams.count();
    
       if(count === 0) {

        const teams = await teamsControllers();
        
        if (teams && teams.length > 0) {
          for (const team of teams) { 
            await Teams.create({ name: team });
          } 
          const updatedTeams = await Teams.findAll();
          return res.status(200).json(updatedTeams);
        }
      }
        else{
          const updatedTeams = await Teams.findAll();
          return res.status(200).json(updatedTeams);
        }
  
      } catch (error) {
    return res.status(500).send(error);
  }}
 

module.exports = teamsHandler