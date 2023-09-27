const getAllDrivers = require("../controllers/getAllDrivers")

async function getAllDriversHandlers(req, res) {
  try {
    const { name } = req.query;

    let data = [];

    if (name !== undefined) {
      data = await getAllDrivers(name);
    } else {
      data = await getAllDrivers();
    }

    console.log(data)

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).send("No hay conductores");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = getAllDriversHandlers;



module.exports = getAllDriversHandlers;