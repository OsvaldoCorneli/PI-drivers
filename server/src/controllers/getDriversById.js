// ID.
// Nombre.
// Apellido.
// Nacionalidad.
// Imagen.
// Descripción.
// Fecha de Nacimiento.
// Escuderías

const axios = require("axios")

async function getDriversById(idDriver){

        
        const {data} = await axios.get(`http://localhost:5000/drivers/${idDriver}`)
        if(!data){throw Error("No hay driver con ese ID")}
       const {code, name, nationality, image, description, dob, teams } = data;
       if(image.url === "" && image.imageby === ""){
        {
        image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png",
        image.imageby = "Image by 1000 marcas"
        }
       } 
       return {code, name, nationality, image, description, dob, teams }



}

module.exports = getDriversById;