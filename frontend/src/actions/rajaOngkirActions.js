import base_url from "../helpers/base_url";
import axios from "axios";

const url = base_url + "/shippings";

export const getCities = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_CITIES",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/getCities`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_CITIES",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_CITIES",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getCity = (attr) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_CITY",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/getCities${attr}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_CITY",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_CITY",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getCitiesByProvinceId = (attr) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_CITIES_BY_PROVINCE_ID",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/getCities${attr}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_CITIES_BY_PROVINCE_ID",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_CITIES_BY_PROVINCE_ID",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProvinces = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_PROVINCES",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/getProvinces`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_PROVINCES",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_PROVINCES",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProvince = (attr) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_PROVINCE",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/getProvinces${attr}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_PROVINCE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_PROVINCE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const checkCost = (body) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "CHECK_COST",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "POST",
      url: `${url}/checkCost`,
      data: body,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        // completed
        dispatch({
          type: "CHECK_COST",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "CHECK_COST",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};
