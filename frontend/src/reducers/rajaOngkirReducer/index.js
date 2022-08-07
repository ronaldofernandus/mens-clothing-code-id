const initialState = {
  actionProvince: "",
  statusProvince: "loading",
  dataProvince: "loading",

  actionProvinces: "",
  statusProvinces: "loading",
  dataProvinces: "loading",

  actionCity: "",
  statusCity: "loading",
  dataCity: "loading",

  actionCities: "",
  statusCities: "loading",
  dataCities: "loading",

  actionCost: "",
  statusCost: "loading",
  dataCost: "loading",
};

const rajaOngkirReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PROVINCE":
      return {
        ...state,
        actionProvince: "GET_PROVINCE",
        statusProvince: payload.status,
        dataProvince: payload.data,
      };
    case "GET_PROVINCES":
      return {
        ...state,
        actionProvinces: "GET_PROVINCES",
        statusProvinces: payload.status,
        dataProvinces: payload.data,
      };
    case "GET_CITY":
      return {
        ...state,
        actionCity: "GET_CITY",
        statusCity: payload.status,
        dataCity: payload.data,
      };
    case "GET_CITIES":
      return {
        ...state,
        actionCities: "GET_CITIES",
        statusCities: payload.status,
        dataCities: payload.data,
      };
    case "CHECK_COST":
      return {
        ...state,
        actionCost: "CHECK_COST",
        statusCost: payload.status,
        dataCost: payload.data,
      };
    case "GET_CITIES_BY_PROVINCE_ID":
      return {
        ...state,
        actionCities: "GET_CITIES_BY_PROVINCE_ID",
        statusCities: payload.status,
        dataCities: payload.data,
      };
    default:
      return state;
  }
};

export default rajaOngkirReducer;
