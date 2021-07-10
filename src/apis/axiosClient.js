import axios from "axios";
import queryString from "query-string";
import { API_ENDPOINT } from "../constants";

const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
