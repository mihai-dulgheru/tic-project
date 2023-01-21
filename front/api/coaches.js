import { axios, axiosAuth } from "../lib";

export const readCoaches = async () => {
  return await axios.get("/coaches");
};

export const createCoach = async (payload) => {
  return await axiosAuth.post("/admin/coaches", payload);
};
