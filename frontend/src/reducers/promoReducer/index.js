const initialState = {
  actionPromo: "",
  statusPromo: "",
  dataPromo: "",

  actionPromo2: "",
  statusPromo2: "",
  dataPromo2: "",
};

const promoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PROMOS":
      return {
        ...state,
        actionPromo: "GET_PROMOS",
        statusPromo: payload.status,
        dataPromo: payload.data,
      };
    case "GET_ACTIVE_PROMOS":
      return {
        ...state,
        actionPromo: "GET_ACTIVE_PROMOS",
        statusPromo: payload.status,
        dataPromo: payload.data,
      };
    case "GET_PROMO_BY_ID"://
      return {
        ...state,
        actionPromo2: "GET_PROMO_BY_ID",
        statusPromo2: payload.status,
        dataPromo2: payload.data,
      };
    case "CREATE_PROMO"://
      return {
        ...state,
        actionPromo2: "CREATE_PROMO",
        statusPromo2: payload.status,
        dataPromo2: payload.data,
      };
    case "EDIT_PROMO":
      return {
        ...state,
        actionPromo2: "EDIT_PROMO",
        statusPromo2: payload.status,
        dataPromo2: payload.data,
      };
    default:
      return state;
  }
};

export default promoReducer;
