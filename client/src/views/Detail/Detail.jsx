// Detail.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { idDetail } from "../../redux/actions/actions";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./detailModule.css";

export default function Detail({setCurrentPage}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.detailsId);
  const search = useSelector((state) => state.driversByName);


  useEffect(() => {
    if (id !== driver.id) {
      dispatch(idDetail(id));
    }
  }, [id, driver.id, dispatch]);

  useEffect(() => {
    if (!driver || Object.keys(driver).length === 0) {
      dispatch(idDetail(id));
    }
  }, [driver, dispatch, id]);

  return (
    <div className="details-container">
      {driver && Object.keys(driver).length !== 0 && id === driver.id ? (
        <>
          <img src={driver.image?.url} alt={driver.image?.imageby} style={{ width: "450px", height: "500px" }} />

          <div className="details-content">
           <button onClick={()=>window.history.back()}>Back</button>
            <h3>ID: {driver.id}</h3>
            <h3>Nombre: {driver.name.forename} {driver.name.surname}</h3>
            <h3>Nacionalidad: {driver.nationality}</h3>
            <h3>Descripción: {driver.description}</h3>
            <h3>Fecha de Nacimiento: {driver.dob}</h3>
            <h3>Equipos: {driver.teams}</h3>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
