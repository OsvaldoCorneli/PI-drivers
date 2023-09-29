const getAllDrivers = require("../controllers/getAllDrivers")

async function getAllDriversHandlers(req, res) {
  try {

      data = await getAllDrivers();
    

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).send("No hay conductores");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}







module.exports = getAllDriversHandlers;