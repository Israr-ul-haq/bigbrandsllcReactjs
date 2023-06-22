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
