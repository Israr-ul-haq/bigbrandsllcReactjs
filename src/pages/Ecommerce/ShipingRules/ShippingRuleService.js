import axios from "axios";
import { baseUrl } from "../../../helpers/baseUrl";

export const getRules = async () => {
  try {
    const response = await axios.get(`${baseUrl}/rules/freight_shipping_rules`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const saveRule = async (body) => {
  try {
    const response = await axios.post(
      `${baseUrl}/rules/freight_shiping_rule`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateRule = async (body) => {
  try {
    const response = await axios.put(
      `${baseUrl}/rules/freight_shiping_rule`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteRule = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/rules/freight_shiping_rule/${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
