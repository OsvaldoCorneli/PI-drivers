const axios = require("axios")
const {Driver} = require("../db");
const { UUID } = require("sequelize");
const { funcionparaencontrarteams } = require("./getAllDrivers");

const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

async function getDriversById(id){
        let data1;
        
        if((!uuidRegex.test(id))){
                
                const {data} = await axios.get(`http://localhost:5000/drivers/${id}`)
                data1 = data
        } else if (typeof id === "string") {
                
                const driver = await Driver.findByPk(id);
              
                if (!driver) {
                  throw new Error("No hay driver con ese ID");
                }
              
                const teams = await funcionparaencontrarteams(driver.id);
              
                data1 = {
                  id: driver.id,
                  name: driver.name,
                  image: driver.image, 
                  dob: driver.dob,
                  nationality: driver.nationality,  
                  teams: teams,
                  description: driver.description,
                };
               
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