import {
  BUSCAR_DRIVERS,
  GET_DRIVERS,
  DRIVER_STATE,
  LOADTEAMS,
  ORDER,
  FILTERTEAM,
  FILTERAPIDB,
  DETAIL,
  CLEAR_DETAIL

} from "../actions/actions-types"; 

import axios from "axios";

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/drivers");
      return dispatch({
        type: GET_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDriverByName = (name) => {
  if(name.length !== 0){
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/drivers/name?name=${name}`
      );
      return dispatch({
        type: BUSCAR_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener conductor por nombre:", error);
    }
  };
}else{
  return {
    type: BUSCAR_DRIVERS,
    payload: name
  };
}
};

export const driverState = (datos) => {
  return {
    type: DRIVER_STATE,
    payload: datos,
  };
};

export const loadTeams = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/teams");

      return dispatch({
        type: LOADTEAMS,
        payload: data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const order = (value) => {
  return {
    type: ORDER,
    payload: value,
  };
};

export const filterTeam = (value) => {
  return {
    type: FILTERTEAM,
    payload: value,
  };  
};

export const filterApiDb = (value) => {
  return {
    type: FILTERAPIDB,
    payload: value,
  };
}

export const idDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/drivers/${id}`);

      dispatch({
        type: DETAIL,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching driver details:", error);
    }
  };
};
 
export const clearDetail = () => {
return{
  type: CLEAR_DETAIL,
  payload: {}
}

}