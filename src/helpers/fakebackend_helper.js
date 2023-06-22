import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// get Products
export const getProducts = (productPrams) =>
  api.get(url.GET_PRODUCTS, productPrams);

export const getBrandsAkeneo = (brandsParams) =>
  api.get(url.getBrandsAkeneo, brandsParams);

export const addProduct = (product) => api.create(url.ADD_PRODUCT, product);

export const updateProduct = (product) =>
  api.update(url.UPDATE_PRODUCT, product);

export const getTableColumns = () => api.get(url.GET_TABLE_HEADERS);

export const updateTableColumns = (tableColumns) =>
  api.create(url.UPDATE_TABLE, tableColumns);

export const getBrand = () => api.get(url.GET_BRAND);

export const addBrand = (brand) => api.create(url.ADD_BRAND, brand);

export const getVendor = () => api.get(url.GET_VENDOR);

export const addVendor = (vendor) => api.create(url.ADD_VENDOR, vendor);
