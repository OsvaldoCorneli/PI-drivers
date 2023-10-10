const createDriver = require("../controllers/createDriver");

async function createDriversHandler(req, res) {
  console.log("body",req.body)
  try {
    const { name, image, dob, nationality, teams, description } = req.body;

    const teams1 = teams.join(",").trim()

    console.log("teams",teams1)
    
    const datos = await createDriver( 
      name, 
      image,
      dob,
      nationality,
      teams1,
      description
    );  

    if (datos.status === 200) { 
      const response = { 
        id: datos.driver.id,
        name: datos.driver.name,
        image: datos.driver.image,
        dob: datos.driver.dob,
        nationality: datos.driver.nationality,
        teams: datos.driver.teams,
        description: datos.driver.description,
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: datos.message });
    }
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = createDriversHandler;
