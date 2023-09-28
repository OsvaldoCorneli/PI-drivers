const getDriversById = require("../controllers/getDriversById")

async function getByIdHandler(req, res){

try {
    const {idDriver} = req.params
    const drivers = await getDriversById(idDriver);
    
    if(!drivers){return res.status(400).json({message: error.message})}

    return res.status(200).json(drivers);
    

} catch (error) {
    return res.status(500).json({message: error.message})

}

}

module.exports = getByIdHandler;