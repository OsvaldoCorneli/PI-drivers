import React from "react";
import "./card.css";

export default function Card(props){
    const {id , name , image , teams , dob} = props

    return (
        <div key={id} className="container" >
        
          <h2 className="title">{name.forename} {name.surname}</h2>
          {teams && teams.length < 40 ? <h3 className="teams">{teams}</h3> : <h3 className="teams1">{teams}</h3>}
        <img  src={image.url} alt={image.imageby} className="image"/>
        
      </div>
     );
  };


