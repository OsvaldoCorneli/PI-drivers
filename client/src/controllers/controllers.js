import axios from "axios";

export async function postDriver(create){

    try {
        const response = await axios.post("http://localhost:3001/drivers", create);
       console.log(response)
        if (response.data) {
          alert("El driver fue creado exitosamente");
        } else {
          alert("Error al crear el driver");
        }
      } catch (error) {
        alert("Error de red", error.message);
      }
    };
    

