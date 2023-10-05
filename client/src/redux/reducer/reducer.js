import { BUSCAR_DRIVERS, GET_DRIVERS, DRIVER_STATE, LOADTEAMS } from "../actions/actions-types";

const initialState = {
    drivers: [],
    allDrivers: [],
    driversByName: [],
    teams: []
   }

const rootReducer = (state=initialState, action)=>{
   const {type , payload} = action;
   switch(type){
   
      case GET_DRIVERS:      
        return { ...state,
            allDrivers: payload 
           };
           
      case BUSCAR_DRIVERS:      
           return { 
              ...state,
              driversByName: payload
              };
      
       case DRIVER_STATE: 
       const response = payload.length !== 0 ? payload : []
       return { 
            ...state,
            drivers: response
                 };
       
       case LOADTEAMS: 
       return { 
            ...state,
            teams: payload
                 };
         
      default:
          return{
              ...state
          }
      
     }
 
  
 }
 
 export default rootReducer;