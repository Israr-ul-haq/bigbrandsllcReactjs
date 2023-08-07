import axios from "axios";
import { baseUrl } from "../../../helpers/baseUrl";

export const getBrands = async (data) => {
  try {
    if (data !== undefined) {
      const response = await axios.get(
        `${baseUrl}/akeneo/AkeneoBrands/${data}`
      );
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

export const getPricingDataByBrand = async (brandId, client_secret) => {
  try {
    const response = await axios.get(
      `${baseUrl}/price/pricing_category/${brandId}/${client_secret}`
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
export const getProductsByStatus = async () => {
  try {
    const response = await axios.get(`${baseUrl}/product/getproductsbystatus`);

    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateFieldAkeneo = async (body, data) => {
  try {
    const response = await axios.put(
      `${baseUrl}/akeneo/products/${data}`,
      body
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
export const resetProductsData = async (body) => {
  try {
    const response = await axios.put(
      `${baseUrl}/product/setAkeneoStatusFalse`,
      body
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateProductStatus = async (body) => {
  try {
    const response = await axios.put(
      `${baseUrl}/product/updateProductStatus`,
      body
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
