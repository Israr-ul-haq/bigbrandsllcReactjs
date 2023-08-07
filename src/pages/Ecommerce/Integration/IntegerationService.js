import axios from "axios";
import { baseUrl } from "../../../helpers/baseUrl";

export const getIntegrationData = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/integration/get_integration_data`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateStatus = async (body) => {
  try {
    const response = await axios.put(
      `${baseUrl}/integration/update_integration_status`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
