import axios from "axios";
import Swal from "sweetalert2";

import base_url from "../helpers/base_url";

const url = base_url + "/banners";

export const getBanners = (attribute) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_BANNERS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: url + attribute,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_BANNERS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_BANNERS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getBannerDetails = (id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_BANNER_DETAILS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/${id}`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_BANNER_DETAILS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_BANNER_DETAILS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getActiveBanners = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_ACTIVE_BANNERS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/active`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_ACTIVE_BANNERS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_ACTIVE_BANNERS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getInactiveBanners = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_INACTIVE_BANNERS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/inactive`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_INACTIVE_BANNERS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_INACTIVE_BANNERS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const addBanner = (form) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "ADD_BANNER",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "POST",
      url: `${url}/add`,
      data: form,
    })
      .then(async (response) => {
        // completed
        await Swal.fire(
          "Add Banner Success!",
          "Congratulations, You've created a Banner!",
          "success"
        );
        dispatch({
          type: "ADD_BANNER",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "ADD_BANNER",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const editBanner = (id, data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "EDIT_BANNER",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "PUT",
      url: `${url}/edit/${id}`,
      data: data,
    })
      .then(async (response) => {
        // completed
        await Swal.fire(
          "Edit Banner Success!",
          "Congratulations, You've edited your Banner!",
          "success"
        );
        dispatch({
          type: "EDIT_BANNER",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "EDIT_BANNER",
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
