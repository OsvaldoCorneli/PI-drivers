// ID.
// Nombre.
// Apellido.
// Nacionalidad.
// Imagen.
// Descripción.
// Fecha de Nacimiento.
// Escuderías
const axios = require("axios")
const {Driver} = require("../db")

async function getDriversById(id){
        let data1;
        if(id === Number){
                const {data} = await axios.get(`http://localhost:5000/drivers/${id}`)
                data1 = data
                }else{
                const data = await Driver.findOne({where:{ id }})
                data1 = data;
                }
        if(!data1){throw Error("No hay driver con ese ID")}
       const {name, nationality, image, description, dob, teams } = data1;
       if(image.url === "" && image.imageby === ""){
        {
        image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png",
        image.imageby = "Image by 1000 marcas"
        }
       } 
       return {id, name, image, dob ,nationality, teams, description, }



}

module.exports = getDriversById;