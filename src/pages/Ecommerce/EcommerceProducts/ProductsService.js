import axios from "axios";
import { baseUrl } from "../../../helpers/baseUrl";

export const getProducts = async (data) => {
  try {
    if (data !== undefined) {
      const response = await axios.get(`${baseUrl}/akeneo/products/${data}`);
      console.log(response);
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

export const getAllProducts = async (
  page,
  limit,
  search,
  brandId,
  pricingCategory,
  checked,
  hasPrice,
  data
) => {
  try {
    const parsedData = JSON.parse(data);
    const sourceId = parsedData?.client_secret;

    if (sourceId !== undefined) {
      const response = await axios.get(
        `${baseUrl}/product/productsAllProducts?page=${page}&search=${search}&limit=${limit}&brandId=${brandId}&pricing_category=${pricingCategory}&includeZeroPrice=${checked}&hasPrice=${hasPrice}&sourceId=${sourceId}`
      );
      console.log(response);
      return response;
    }
  } catch (error) {
    return error.response;
  }
};
export const getZeroPriceProducts = async (page, limit) => {
  try {
    const response = await axios.get(
      `${baseUrl}/product/getZeroValueProducts?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getProductBySku = async (sku) => {
  try {
    const response = await axios.get(
      `${baseUrl}/product/products_by_id/${sku}`
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateProductApi = async (id, body) => {
  try {
    const response = await axios.put(
      `${baseUrl}/product//updateProduct/${id}`,
      body
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const saveCompetitonProductsData = async (body) => {
  try {
    const response = await axios.post(
      `${baseUrl}/competitor_products/crete_competition_products`,
      body
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getCompetitonProductsData = async (params) => {
  try {
    const response = await axios.get(
      `${baseUrl}/competitor_products/get_competition_products`,
      { params }
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const update_Competition_products = async (body) => {
  try {
    const response = await axios.post(
      `${baseUrl}/competitor_products/crete_competition_products`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const set_selected_products = async (
  status,
  search,
  selectedBrand,
  selectedPricing,
  toggleValue,
  priceToggleValue
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/product/set_selected_products?search=${search}&brandId=${selectedBrand}&pricing_category=${selectedPricing}&akeneoStatus=${status}&includeZeroPrice=${toggleValue}&hasPrice=${priceToggleValue}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
