import axios from "axios";
import Swal from "sweetalert2";

import base_url from "../helpers/base_url";

const url = base_url + "/products";

export const getAllProducts = (attribute) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_ALL_PRODUCTS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url + attribute,
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "GET_ALL_PRODUCTS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ALL_PRODUCTS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProductsBySearch = (attribute) => {
  console.log("SEARCH ONLY");
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_PRODUCTS_BY_SEARCH",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url + "/search" + attribute,
    })
      .then((response) => {
        dispatch({
          type: "GET_PRODUCTS_BY_SEARCH",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_PRODUCTS_BY_SEARCH",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getAndFilterProducts = (attribute, filter) => {
  console.log("SEARCH AND FILTER");
  console.log(filter);
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_AND_FILTER_PRODUCTS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url + "/search" + attribute,
      data: {},
      params: {
        filter: filter,
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "GET_AND_FILTER_PRODUCTS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({
          type: "GET_AND_FILTER_PRODUCTS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProductById = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_PRODUCT_BY_ID",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: `${url}/${id}`,
    })
      .then((response) => {
        dispatch({
          type: "GET_PRODUCT_BY_ID",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch((error) => {
        dispatch({
          type: "GET_PRODUCT_BY_ID",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProductsSortPrice = (limit) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_PRODUCTS_SORT_PRICE",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url + "/highlight_sort",
      params: {
        limit: limit,
      },
    })
      .then((response) => {
        console.log("RESPONSE DATA SLIDER=== ", response.data);
        dispatch({
          type: "GET_PRODUCTS_SORT_PRICE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_PRODUCTS_SORT_PRICE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProductsPopular = (limit) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_PRODUCTS_POPULAR",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url + "/popular_product",
      params: {
        limit: limit,
      },
    })
      .then((response) => {
        console.log("RESPONSE DATA SLIDER=== ", response.data);
        dispatch({
          type: "GET_PRODUCTS_POPULAR",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_PRODUCTS_POPULAR",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const create = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "CREATE",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "POST",
      url: url,
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        await Swal.fire(
          "Add Product Success!",
          "Congratulations, You've created a Product!",
          "success"
        );
        dispatch({
          type: "CREATE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        dispatch({
          type: "CREATE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const update = (data, id) => {
  console.log(data, id);
  return (dispatch) => {
    // loading
    dispatch({
      type: "UPDATE",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "PUT",
      url: `${url}/${id}`,
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        console.log(response.data);
        await Swal.fire(
          "Edit Product Success!",
          "Congratulations, You've edited your Product!",
          "success"
        );
        dispatch({
          type: "UPDATE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch((error) => {
        dispatch({
          type: "UPDATE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const createproductbulk = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "CREATE_BULK",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "POST",
      url: url + "/bulkProduct",
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        await Swal.fire(
          "Add Product Success!",
          "Congratulations, You've created a Products!",
          "success"
        );
        dispatch({
          type: "CREATE_BULK",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch(async (error) => {
        await Swal.fire("Add Product Failed", "error");
        dispatch({
          type: "CREATE_BULK",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};
