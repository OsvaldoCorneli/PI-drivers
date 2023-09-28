const axios = require("axios")
const {Driver} = require("../db")

const sendToDatabase = async (req, res) => {
    try { 
     
        const {data} = await axios.get("http://localhost:5000/drivers")
        if(!data){return res.status(400).send("No hay conductores")}
         
        const filtrado = data.map((propiedad) => ({
           id: propiedad.id,
            names: propiedad.name?.forename,
            lastname: propiedad.name?.surname,
            description: propiedad.description,
            imagen: propiedad.image?.url,
            nationality: propiedad.nationality,
            birthdate: propiedad.dob
  })); 
       Driver.bulkCreate(filtrado)
        return res.status(200).send("Registros insertados exitosam")

        
    } catch (error) {
       return res.status(500).json({message: error.message})
    }

  
}


  module.exports = sendToDatabase;







