import store from "@/store";
import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

const withBearer = (req) => {
  req.headers.authorization = `Bearer ${store.state.auth.token}`;
  return req;
};

const success = (response) => {
  return response.data;
};

const error = async (error) => {
  throw error.response.data;
};

Axios.interceptors.request.use(withBearer);
Axios.interceptors.response.use(success, error);

export default Axios;
