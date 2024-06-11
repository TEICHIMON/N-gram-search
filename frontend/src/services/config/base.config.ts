import { API_BASE_URL } from "../../config/constants.ts";

export default {
  baseURL: `${API_BASE_URL}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};
