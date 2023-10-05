import {BUSCAR_DRIVERS, GET_DRIVERS, DRIVER_STATE, LOADTEAMS} from "../actions/actions-types";

import axios from "axios";


export const getDrivers = ()=>{
    return async (dispatch) => { 
        try{ 
            
           const {data} = await axios.get("http://localhost:3001/drivers")
              return dispatch({
               type: GET_DRIVERS,         
                  payload: data})     
                  
        }  
        catch(error) {console.log(error)}
    }

}

export const getDriverByName = (name) => {
    return async (dispatch) => { 
        try { 
            const { data } = await axios.get(`http://localhost:3001/drivers/name?name=${name}`);
            return dispatch({
                type: BUSCAR_DRIVERS,         
                payload: data
            });
        } catch (error) {
            console.error("Error al obtener conductor por nombre:", error);
        }
    };
};



export const driverState = (datos)=>{
    return {
     type:DRIVER_STATE,
     payload: datos
    }
}


export const loadTeams = () => {
    return async (dispatch) => { 
        try {
            const { data } = await axios.get("http://localhost:3001/teams");
            
            return dispatch({
                type: LOADTEAMS,
                payload: data
            });
        } catch (error) {
            throw error;
        }
    };
};



