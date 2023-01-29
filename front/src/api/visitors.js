import { axios } from "@/lib";

export const createRequest = async (payload) => {
  const { coachId, ...data } = payload;
  const response = await axios.post(`/visitor/requests/${coachId}`, data);

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response;
};
