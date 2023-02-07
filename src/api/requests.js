import { axios, axiosAuth } from "@/lib";

export const createRequest = async (payload) => {
  const { coachId, ...data } = payload;
  const response = await axiosAuth.post(`/admin/requests/${coachId}`, data);

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response;
};

export const readRequests = async (coachId) => {
  return await axios.get(`/requests/${coachId}`);
};

export const deleteRequest = async ({ coachId, requestId }) => {
  const response = await axiosAuth.delete(
    `/admin/requests/${coachId}/${requestId}`
  );

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response?.data || {};
};
