import axios from "axios";

export async function postDriver(create){

    try {
        const response = await axios.post("http://localhost:3001/drivers", create);
        if (response.data) {
          alert("El driver fue creado exitosamente");
        } else {
          alert("Error al crear el driver");
        }
      } catch (error) {
        alert("El drivers con esos datos ya existe");
      }
    };
    

