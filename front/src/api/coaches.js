import { axios, axiosAuth } from "@/lib";

export const readCoaches = async () => {
  return await axios.get("/coaches");
};

export const readCoach = async (id) => {
  return await axios.get(`/coaches/${id}`);
};

export const createCoach = async (payload) => {
  const response = await axiosAuth.post("/admin/coaches", payload);

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response;
};
