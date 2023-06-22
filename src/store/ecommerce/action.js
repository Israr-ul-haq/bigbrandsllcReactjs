import {
  GET_PRODUCTS,
  ADD_PRODUCTS,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_TABLE_COLUMNS,
  UPDATE_TABLE_COLUMNS,
  ADD_PRODUCT,
  GET_SELECTED_ITEM,
  GET_BRAND,
  ADD_BRAND,
  GET_VENDOR,
  ADD_VENDOR,
  UPDATE_PRODUCT,
  GET_BRANDs,
} from "./actionType";

// common success
export const ecommerceApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ecommerceApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});
export const getSelectedItemSuccess = (actionType, data) => {
  return {
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  };
};
export const addProductSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const getTableColumnsSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
export const updateTableColumnsSuccess = (actionType, data) => {
  //console.log("action type")
  //console.log(actionType, data)
  return {
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  };
};
export const getBrandSuccess = (actionType, data) => {
  return {
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  };
};
export const getVendorSuccess = (actionType, data) => {
  return {
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  };
};
export const updateProductSuccess = (actionType, data) => {
  return {
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  };
};

export const getTableColumnsError = (actionType, data) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, data },
});
export const updateTableColumnsError = (actionType, data) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, data },
});
export const addBrandSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
export const addVendorSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
export const getProducts = (productparams) => ({
  type: GET_PRODUCTS,
  payload: productparams,
});
export const getBrand = (brands) => ({
  type: GET_BRAND,
  payload: brands,
});

////getBrands
export const getBrandData = (brandsData) => ({
  type: GET_BRANDs,
  payload: brandsData,
});


export const addBrand = (brand) => ({
  type: ADD_BRAND,
  payload: brand,
});
export const getVendor = (vendor) => ({
  type: GET_VENDOR,
  payload: vendor,
});
export const addVendor = (vendor) => ({
  type: ADD_VENDOR,
  payload: vendor,
});
export const getItems = (data) => ({
  type: GET_SELECTED_ITEM,
  payload: data,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const getTableColumns = () => ({
  type: GET_TABLE_COLUMNS,
});
export const updateTableColumns = (tableColumns) => {
  //console.log("store", tableColumns)
  return {
    type: UPDATE_TABLE_COLUMNS,
    payload: tableColumns,
  };
};
export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    payload: product,
  };
};
