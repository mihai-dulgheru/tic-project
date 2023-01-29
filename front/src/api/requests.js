import { axiosAuth } from "@/lib";

export const createRequest = async (payload) => {
  const { coachId, ...data } = payload;
  const response = await axiosAuth.post(`/admin/requests/${coachId}`, data);

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response;
};
