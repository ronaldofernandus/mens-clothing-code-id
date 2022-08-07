import axios from "axios";
import Swal from "sweetalert2";

import base_url from "../helpers/base_url";

const url = base_url + "/promo";

export const getPromos = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_PROMOS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        dispatch({
          type: "GET_PROMOS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch(async (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "GET_PROMOS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getPromoById = (id) => {
  return async (dispatch) => {
    // loading
    dispatch({
      type: "GET_PROMO_BY_ID",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    await axios({
      method: "GET",
      url: url + "/" + id,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        // Swal.fire({
        //     icon: "success",
        //     title: "oy berhasil ngeget",
        //     text: JSON.stringify(response.data),
        // });
        dispatch({
          type: "GET_PROMO_BY_ID",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch(async (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "GET_PROMO_BY_ID",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const createPromo = (data) => {
  return async (dispatch) => {
    // loading
    dispatch({
      type: "CREATE_PROMO",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    await axios({
      method: "POST",
      url: url,
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        await Swal.fire(
          "Add Promo Success!",
          "Congratulations, You've created a Promo!",
          "success"
        );
        dispatch({
          type: "CREATE_PROMO",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch(async (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "CREATE_PROMO",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const editPromo = (id, data) => {
  return async (dispatch) => {
    //loading
    dispatch({
      type: "EDIT_PROMO",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    await axios({
      method: "PUT",
      url: `${url}/${id}`,
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        // completed
        await Swal.fire(
          "Edit Promo Success!",
          "Congratulations, You've edited your Promo!",
          "success"
        );
        dispatch({
          type: "EDIT_PROMO",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        // failed
        dispatch({
          type: "EDIT_PROMO",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const clear = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "CLEAR",
      payload: {
        status: "empty",
        data: "Empty",
      },
    });
  };
};
