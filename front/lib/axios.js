import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

const success = (response) => {
  return response.data;
};

const error = async (error) => {
  throw error.response.data;
};

Axios.interceptors.response.use(success, error);

export default Axios;
