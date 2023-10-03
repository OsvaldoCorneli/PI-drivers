const getDriverByName = require("../controllers/getDriverByName");



async function getNameHamdler(req, res) {
    try {
      const { name } = req.query;
  
      if (name !== undefined) {
        data = await getDriverByName(name);}
  
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(200).json("vacio");
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  module.exports = getNameHamdler;
  
  
  