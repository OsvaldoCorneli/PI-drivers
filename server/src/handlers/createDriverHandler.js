const createDriver = require("../controllers/createDriver");

async function createDriversHandler(req, res) {
  try {
    const { id, name, image, dob, nationality, teams, description } = req.body;

    const datos = await createDriver(
      name,
      image,
      dob,
      nationality,
      teams,
      description
    ); 

    if (datos.status === 200) {
      res.status(200).send(datos);
    } else {
      res.status(404).json({ message: datos.message }); // Cambié "message" a "datos.message"
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = createDriversHandler;
