const initialState = {
  action: "",
  status: "loading",
  data: "Loading",

  actionSort: "",
  statusSort: "loading",
  dataSort: "loading",

  actionPopular: "",
  statusPopular: "loading",
  dataPopular: "Loading",

  actionUpdate: "",
  statusUpdate: "",
  dataUpdate: "",
};

const cmsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        action: "GET_ALL_PRODUCTS",
        status: payload.status,
        data: payload.data,
      };
    case "GET_PRODUCTS_BY_SEARCH":
      return {
        ...state,
        action: "GET_PRODUCTS_BY_SEARCH",
        status: payload.status,
        data: payload.data,
      };
    case "GET_AND_FILTER_PRODUCTS":
      return {
        ...state,
        action: "GET_AND_FILTER_PRODUCTS",
        status: payload.status,
        data: payload.data,
      };
    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        action: "GET_PRODUCT_BY_ID",
        status: payload.status,
        data: payload.data,
      };
    case "GET_PRODUCTS_SORT_PRICE":
      return {
        ...state,
        actionSort: "GET_PRODUCTS_SORT_PRICE",
        statusSort: payload.status,
        dataSort: payload.data,
      };
    case "GET_PRODUCTS_POPULAR":
      return {
        ...state,
        actionPopular: "GET_PRODUCTS_POPULAR",
        statusPopular: payload.status,
        dataPopular: payload.data,
      };
    case "CREATE":
      return {
        ...state,
        action: "CREATE",
        status: payload.status,
        data: payload.data,
      };
    case "UPDATE":
      return {
        ...state,
        actionUpdate: "UPDATE",
        statusUpdate: payload.status,
        dataUpdate: payload.data,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        action: "DELETE_PRODUCT",
        status: payload.status,
        data: payload.data,
      };
    case "CREATE_BULK":
      return {
        ...state,
        action: "CREATE_BULK",
        status: payload.status,
        data: payload.data,
      };
    default:
      return state;
  }
};

export default cmsReducer;
