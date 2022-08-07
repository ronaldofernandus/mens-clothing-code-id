const initialState = {
  action: "",
  status: "loading",
  data: "Loading",
};

const miscReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_BANNERS":
      return {
        ...state,
        action: "GET_BANNERS",
        status: payload.status,
        data: payload.data,
      };
    case "GET_ACTIVE_BANNERS":
      return {
        ...state,
        action: "GET_ACTIVE_BANNERS",
        status: payload.status,
        data: payload.data,
      };
    case "GET_INACTIVE_BANNERS":
      return {
        ...state,
        action: "GET_INACTIVE_BANNERS",
        status: payload.status,
        data: payload.data,
      };
    case "ADD_BANNER":
      return {
        ...state,
        action: "ADD_BANNER",
        status: payload.status,
        data: payload.data,
      };
    case "GET_BANNER_DETAILS":
      return {
        ...state,
        action: "GET_BANNER_DETAILS",
        status: payload.status,
        data: payload.data,
      };
    case "EDIT_BANNER":
      return {
        ...state,
        action: "EDIT_BANNER",
        status: payload.status,
        data: payload.data,
      };
    default:
      return state;
  }
};

export default miscReducer;
