import { axios } from "../lib";

export const getCoaches = async () => {
  return await axios.get("/coaches");
};
