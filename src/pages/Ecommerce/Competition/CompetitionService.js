import axios from "axios";
import { baseUrl } from "../../../helpers/baseUrl";

export const getCompetitionData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/competitor/get_competition`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const saveCompetitionData = async (body) => {
  try {
    const response = await axios.post(
      `${baseUrl}/competitor/competitonSave`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateCompetitionData = async (id, body) => {
  try {
    const response = await axios.put(
      `${baseUrl}/competitor/competitonUpdate/${id}`,
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteCompetitionData = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/competitor/competitionDelete/${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
