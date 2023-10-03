import { BUSCAR_DRIVERS, GET_DRIVERS, DRIVER_STATE } from "../actions/actions-types";

const initialState = {
    drivers: [],
    copyDrivers: [],
    driversByName: []
    
   
   }

const rootReducer = (state=initialState, action)=>{
   const {type , payload} = action;
   switch(type){
   
      case GET_DRIVERS:      
        return { ...state,
            copyDrivers: payload 
           };
           
      case BUSCAR_DRIVERS:      
           return { 
              ...state,
              driversByName: payload
              };
      
       case DRIVER_STATE: 
       const response = payload.length === 0? [] : payload
       return { 
            ...state,
            drivers: response
                 };
      
     
      default:
          return{
              ...state
          }
      
     }
 
  
 }
 
 export default rootReducer;