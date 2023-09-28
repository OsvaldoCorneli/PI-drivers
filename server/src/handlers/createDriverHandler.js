const createDriver = require("../controllers/createDriver");

async function createDriversHandler(req, res) {
  try {
    const { name, image, dob, nationality, teams, description } = req.body;

    const datos = await createDriver(
      name,
      image,
      dob,
      nationality,
      teams,
      description
    ); 

    if (datos.status === 200) {
      const response = {
        id: datos.driver.id,
        name: datos.driver.name,
        image: datos.driver.image,
        dob: datos.driver.dob,
        nationality: datos.driver.nationality,
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
