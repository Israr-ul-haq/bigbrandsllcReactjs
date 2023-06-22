import axios from "axios";
import { baseUrl } from "../../../helpers/baseUrl";

export const getBrandsData = async (brandId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/price/pricing_category/${brandId}`
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getProductsCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/akeneo/product_categories`);

    return response;
  } catch (error) {
    return error.response;
  }
};
export const saveCategory = async (body) => {
  try {
    const response = await axios.post(
      `${baseUrl}/price/pricing_category`,
      body
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateCategory = async (body) => {
  try {
    const response = await axios.put(`${baseUrl}/price/pricing_category`, body);

    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateBrandsSetting = async (body, id) => {
  try {
    const response = await axios.put(
      `${baseUrl}/product/update_the_products_websiteId/${id}`,
      body
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
