import {
  BUSCAR_DRIVERS,
  GET_DRIVERS,
  DRIVER_STATE,
  LOADTEAMS,
  ORDER,
  FILTERTEAM,
  FILTERAPIDB,
  DETAIL,
} from "../actions/actions-types";

const initialState = {
  drivers: [],
  allDrivers: [],
  driversByName: [],
  teams: [],
  copyDrivers: [],
  detailsId: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const copiaDriver = [...state.allDrivers];
  switch (type) {
    case GET_DRIVERS:
      return { ...state, allDrivers: payload };

    case BUSCAR_DRIVERS:
      payload.length === 0 ? [] : payload
      return {
        ...state,
        driversByName: payload,
      };

    case DRIVER_STATE:
      const response = payload.length !== 0 ? payload : [];
      return {
        ...state,
        drivers: response,
      };

    case LOADTEAMS:
      return {
        ...state,
        teams: payload,
      };

    case ORDER:
      return {
        ...state,
        drivers:
          payload === "reset"
            ? [...state.drivers].sort((a, b) => a.id - b.id)
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
      return {
        ...state,
        copyDrivers: [...state.drivers],
        drivers:
          payload === "reset"
            ? [...state.allDrivers]
            : [
                ...copiaDriver.filter((driver) => {
                  return (
                    driver.teams &&
                    driver.teams
                      .split(",")
                      .map((team) => team.trim())
                      .includes(payload)
                  );
                }),
              ],
      };

    case FILTERAPIDB:
      return {
        ...state,
        drivers:
          payload === "reset"
            ? [...state.allDrivers]
            : payload === "api"
            ? [...copiaDriver.filter((driver) => typeof driver.id === "number")]
            : payload === "db"
            ? [...copiaDriver.filter((driver) => typeof driver.id === "string")]
            : "",
      };

    case DETAIL:
      return {
        ...state,
        detailsId: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
