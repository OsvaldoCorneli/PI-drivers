import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { useSelector } from "react-redux";
import validation from "../../helpers/validation";

export default function Form() {
  const teamsDb = useSelector(state => state.teams)
  const [error , setError] = useState({});
  const [create, setCreate] = useState({


    name: { forename: "", surname: "" },
    image: { url: "" },
    dob: "",
    nationality: "",
    teams: "",
    description: "",

  });
console.log(error)
  // const handleChange = (event) => {
    
  //   if (event.target.name === "forename" || event.target.name === "surname") {
  //     setCreate({
  //       ...create,
  //       name: { ...create.name, [event.target.name]: event.target.value },
  //     });
  //   } else if (event.target.name === "url") {
  //     setCreate({
  //       ...create,
  //       image: { ...create.image, [event.target.name]: event.target.value },
  //     });
  //   } else if (event.target.name === "teams") {
  //     // Maneja la selección múltiple
  //     const selectedTeams = Array.from(event.target.selectedOptions, (option) => option.value);
  //     setCreate({ ...create, teams: selectedTeams});
  //   } else {
  //     setCreate({ ...create, [event.target.name]: event.target.value });
  //   }
  // };

  const handleChange = (event) => {
    let updatedCreate = { ...create };
  
    if (event.target.name === "forename" || event.target.name === "surname") {
      updatedCreate = {
        ...updatedCreate,
        name: { ...updatedCreate.name, [event.target.name]: event.target.value },
      };
    } else if (event.target.name === "url") {
      updatedCreate = {
        ...updatedCreate,
        image: { ...updatedCreate.image, [event.target.name]: event.target.value },
      };
    } else if (event.target.name === "teams") {
      // Maneja la selección múltiple
      const selectedTeams = Array.from(event.target.selectedOptions, (option) => option.value);
      updatedCreate = { ...updatedCreate, teams: selectedTeams };
    } else {
      updatedCreate = { ...updatedCreate, [event.target.name]: event.target.value };
    }
  
    setCreate(updatedCreate);
  
    setError(validation(updatedCreate));
  };
  

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post("http://localhost:3001/drivers", create);
   console.log(response)
    if (response.data) {
      console.log("El driver fue creado exitosamente");
    } else {
      console.error("Error al crear el driver");
    }
  } catch (error) {
    console.error("Error de red", error.message);
  }
};

  console.log(create);

  return (
    <div className="form-container">
      <h2>CREATE DRIVER</h2>

      <form className="form" action=""  onSubmit={handleSubmit}>
        <label htmlFor="forename">Name</label>
        <input type="text" name="forename" value={create.forename} onChange={handleChange}/>
        <p style={{color:"red"}}>{error.forename}</p><br />

        <label htmlFor="surname">Lastname</label>
        <input type="text" name="surname" value={create.surname} onChange={handleChange}/>
        <p style={{color:"red"}}>{error.surname}</p><br />
        <label htmlFor="url">Image</label>
        <input type="text" name="url" value={create.url} onChange={handleChange} />
        <p style={{color:"red"}}>{error.url}</p><br />
        <label htmlFor="dob">dob</label>
        <input type="text" name="dob" value={create.dob} onChange={handleChange} />
        <p style={{color:"red"}}>{error.dob}</p><br />
        <label htmlFor="nationality">nationality</label>
        <input type="text" name="nationality" value={create.nationality} onChange={handleChange}/>
        <p style={{color:"red"}}>{error.nationality}</p><br />
        <label htmlFor="teams">Teams</label> <br />
        <select
          name="teams"
          value={create.teams}
          onChange={handleChange}
          multiple
        >
          {teamsDb.sort((a, b) => a.name.localeCompare(b.name)).map((team) => (
            <option value={team.name} key={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <p style={{color:"red"}}>{error.teams}</p><br />

        <label htmlFor="description">description</label>
        <input type="text" name="description" value={create.description} onChange={handleChange}/>
        <p style={{color:"red"}}>{error.description}</p><br />
        {Object.keys(error).length === 0 ? <button type="submit" >Create</button>:null}
      </form>
    </div>
  );
}
