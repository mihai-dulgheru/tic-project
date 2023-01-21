import { axios } from "/lib";

export const login = async (payload) => {
  return await axios.get("/login", payload);
};
