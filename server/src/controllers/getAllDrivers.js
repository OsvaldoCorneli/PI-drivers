const axios = require("axios")


async function getAllDrivers(name) {
  console.log(name);
  let sinImage = [];
  let data1;
  if(name){
     data1 = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`);
  }else{
     data1 = await axios.get("http://localhost:5000/drivers")
  }
     
    const {data} = data1;

  if (!data) {
    throw new Error("No hay conductores");
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].image.url === '' && data[i].image.imageby === '') {
      sinImage.push(data[i].id);
      data[i].image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png";
      data[i].image.imageby = "Image by 1000 marcas";
    }
  }

  return data;
}

  

module.exports = getAllDrivers;