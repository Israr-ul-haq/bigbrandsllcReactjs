import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ecoomerce Redux States
import {
  ADD_PRODUCT,
  GET_PRODUCTS,
  GET_SELECTED_ITEM,
  GET_TABLE_COLUMNS,
  UPDATE_TABLE_COLUMNS,
  GET_BRAND,
  ADD_BRAND,
  UPDATE_PRODUCT,
  GET_VENDOR,
  ADD_VENDOR,
  GET_BRANDs,
} from "./actionType";

import {
  ecommerceApiResponseSuccess,
  ecommerceApiResponseError,
  getTableColumnsSuccess,
  getTableColumnsError,
  updateTableColumnsSuccess,
  updateTableColumnsError,
  getSelectedItemSuccess,
  getBrandSuccess,
  addBrandSuccess,
  getVendorSuccess,
  addVendorSuccess,
  updateProductSuccess,
} from "./action";

//Include Both Helper File with needed methods
import {
  getProducts as getProductsApi,
  addProduct as addProductApi,
  getTableColumns as getTableColumnsAPI,
  updateTableColumns as updateTableColumnsAPI,
  getBrand as getBrandApi,
  addBrand as addBrandApi,
  getVendor as getVendorApi,
  addVendor as addVendorApi,
  updateProduct as updateProductApi,
  getBrandsAkeneo,
} from "../../helpers/fakebackend_helper";

// function* getProducts({ payload: productparams }) {
//   try {
//     const response = yield call(getProductsApi, productparams);
//     yield put(
//       ecommerceApiResponseSuccess(GET_PRODUCTS, {
//         products: response,
//         items_count: response.items_count,
//         curPage: productparams.page,
//         pageSize: productparams.limit,
//       })
//     );
//   } catch (error) {
//     console.log(error, "errorerror");
//     yield put(ecommerceApiResponseError(GET_PRODUCTS, error));
//   }
// }
function* getItem({ payload: data }) {
  try {
    yield put(getSelectedItemSuccess(GET_SELECTED_ITEM, data));
  } catch (error) {
    console.log("error");
  }
}
function* addProduct({ payload: product }) {
  try {
    // console.log("response", product);
    const response = yield call(addProductApi, product);
  } catch (error) {
    console.log("error");
  }
}
function* updateProduct({ payload: data }) {
  // console.log(data);
  try {
    const response = yield call(updateProductApi, data);
    yield put(updateProductSuccess(UPDATE_PRODUCT, data));
  } catch {
    console.log("error");
  }
}
function* getTableColumns() {
  try {
    const response = yield call(getTableColumnsAPI);
    //console.log("response table", response)
    yield put(getTableColumnsSuccess(GET_TABLE_COLUMNS, response.data));
  } catch (error) {
    yield put(getTableColumnsError(GET_TABLE_COLUMNS, error));
  }
}
function* updateTableColumns({ payload: tableColumns }) {
  try {
    //console.log("Update Columns", tableColumns)
    const response = yield call(updateTableColumnsAPI, tableColumns);
    //console.log("tablecolumns response", response)
    yield put(updateTableColumnsSuccess(UPDATE_TABLE_COLUMNS, response.data));
  } catch (error) {
    yield put(updateTableColumnsError(UPDATE_TABLE_COLUMNS, error));
  }
}
// function* getBrands() {
//   try {
//     const response = yield call(getBrandApi);
//     yield put(getBrandSuccess(GET_BRAND, response.data));
//   } catch (error) {
//     console.log("brand error");
//   }
// }
function* addBrand({ payload: data }) {
  try {
    const response = yield call(addBrandApi, data);
    yield put(addBrandSuccess(ADD_BRAND, data));
  } catch (error) {
    console.log("error");
  }
}
function* getVendors() {
  // console.log("vendor saga")
  try {
    const response = yield call(getVendorApi);
    yield put(getVendorSuccess(GET_VENDOR, response.data));
  } catch (error) {
    console.log("product category error");
  }
}
function* addVendor({ payload: data }) {
  try {
    const response = yield call(addVendorApi, data);
    yield put(addVendorSuccess(ADD_VENDOR, data));
  } catch (error) {
    console.log("error");
  }
}
// function* getBrandsData() {
//   try {
//     const response = yield call(getBrandsAkeneo);
//     yield put(getBrandSuccess(GET_BRANDs, response.data));
//   } catch (error) {
//     console.log("brand error");
//   }
// }

// export function* watchGetProducts() {
//   yield takeEvery(GET_PRODUCTS, getProducts);
// }
export function* watchGetItem() {
  yield takeEvery(GET_SELECTED_ITEM, getItem);
}
export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT, addProduct);
}
export function* watchGetTableColumns() {
  yield takeEvery(GET_TABLE_COLUMNS, getTableColumns);
}

export function* watchUpdateTableColumns() {
  yield takeEvery(UPDATE_TABLE_COLUMNS, updateTableColumns);
}
// export function* watchBGetBrands() {
//   yield takeEvery(GET_BRAND, getBrands);
// }
export function* watchAddBrand() {
  yield takeEvery(ADD_BRAND, addBrand);
}
export function* watchGetVendor() {
  yield takeEvery(GET_VENDOR, getVendors);
}
export function* watchAddVendor() {
  yield takeEvery(ADD_VENDOR, addVendor);
}
export function* watchUpdateProduct() {
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
}
// export function* watchGetBrandsData() {
//   yield takeEvery(GET_BRANDs, getBrandsData);
// }
function* ecommerceSaga() {
  yield all([
    // fork(watchGetProducts),
    fork(watchGetItem),
    fork(watchAddProduct),
    fork(watchGetTableColumns),
    fork(watchUpdateTableColumns),
    // fork(watchBGetBrands),
    fork(watchAddBrand),
    fork(watchGetVendor),
    fork(watchAddVendor),
    fork(watchUpdateProduct),
    // fork(watchGetBrandsData),
  ]);
}

export default ecommerceSaga;
