import {
  BUSCAR_DRIVERS,
  GET_DRIVERS,
  DRIVER_STATE,
  LOADTEAMS,
  ORDER,
  FILTERTEAM,
  FILTERAPIDB,
  DETAIL,
  CLEAR_DETAIL,
} from "../actions/actions-types";

const initialState = {
  drivers: [],
  allDrivers: [],
  driversByName: [],
  teams: [],
  copyDrivers: [],
  detailsId: [],
  copiaFiltro: [],
  filtrar: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const copiaAllDriver = [...state.allDrivers];

  switch (type) {
    case GET_DRIVERS:
      return { ...state, allDrivers: payload };

    case BUSCAR_DRIVERS:
      payload.length === 0 ? [] : payload;
      return {
        ...state,
        driversByName: payload,
      };

    case DRIVER_STATE:
      const response = payload.length !== 0 ? payload : [];
      return {
        ...state,
        drivers: response,
        copiaFiltro: response,
      };

    case LOADTEAMS:
      return {
        ...state,
        teams: payload,
      };

    case ORDER:
      const diverIdnumber = state.drivers.filter(
        (driver) => typeof driver.id === "number"
      );
      const driversidUUID = state.drivers.filter(
        (driver) => typeof driver.id === "string" && driver.id.includes("-")
      );
      const driverSort = [
        ...diverIdnumber.sort((a, b) => a.id - b.id),
        ...driversidUUID.sort((a, b) => a.id.localeCompare(b.id)),
      ];
      return {
        ...state,
        drivers:
          payload === "reset"
            ? driverSort
            : payload === "ascendente"
            ? [...state.drivers].sort((a, b) =>
                a.name.forename.localeCompare(b.name.forename)
              )
            : payload === "descendente"
            ? [...state.drivers].sort((a, b) =>
                b.name.forename.localeCompare(a.name.forename)
              )
            : payload === "nacimientoa"
            ? [...state.drivers].sort((a, b) => a.dob.localeCompare(b.dob))
            : payload === "nacimientod"
            ? [...state.drivers].sort((a, b) => b.dob.localeCompare(a.dob))
            : state.drivers,
      };

    case FILTERTEAM:
      let response1;
      if (state.copyDrivers.length === 0) {
        response1 =
          payload === "reset"
            ? [...state.allDrivers]
            : [
                ...copiaAllDriver.filter((driver) => {
                  return (
                    driver.teams &&
                    driver.teams
                      .split(",")
                      .map((team) => team.trim())
                      .includes(payload)
                  );
                }),
              ];
      } else {
        response1 =
          payload === "reset"
            ? [...state.copiaFiltro]
            : [
                ...state.filtrar.filter((driver) => {
                  return (
                    driver.teams &&
                    driver.teams
                      .split(",")
                      .map((team) => team.trim())
                      .includes(payload)
                  );
                }),
              ];
      }

      return {
        ...state,
        drivers: response1,
      };

    case FILTERAPIDB:
      const response2 =
        payload === "reset"
          ? [...state.allDrivers]
          : payload === "api"
          ? [
              ...copiaAllDriver.filter(
                (driver) => typeof driver.id === "number"
              ),
            ]
          : payload === "db"
          ? [
              ...copiaAllDriver.filter(
                (driver) => typeof driver.id === "string"
              ),
            ]
          : "";
          
      return {
        ...state,
        drivers: response2,
        copyDrivers: payload === "reset" ? [] : [...state.drivers],
        copiaFiltro: response2,
        filtrar: response2,
      };

    case DETAIL:
      return {
        ...state,
        detailsId: payload,
      };


    case CLEAR_DETAIL:
      return{
        ...state,
        detailsId: payload
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
