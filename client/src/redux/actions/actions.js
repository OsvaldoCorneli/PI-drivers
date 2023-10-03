import {BUSCAR_DRIVERS, GET_DRIVERS, DRIVER_STATE} from "../actions/actions-types";

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

export const getDriverByName = (name)=>{
    return async (dispatch) => { 
        try{ 
            
           const {data} = await axios.get(`http://localhost:3001/drivers/name?name=${name}`)
           console.log("data", data);
              return dispatch({
               type: BUSCAR_DRIVERS,         
                  payload: data})     
                  
        } 
        catch(error) {console.log(error)}


}

}

export const driverState = (datos)=>{
    return {
     type:DRIVER_STATE,
     payload: datos
    }

}





