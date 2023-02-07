import { axios, axiosAuth } from "@/lib";

export const readMessages = async (userId) => {
  return await axios.get(`/messages/${userId}`);
};

export const deleteMessage = async ({ userId, messageId }) => {
  const response = await axiosAuth.delete(
    `/admin/messages/${userId}/${messageId}`
  );

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response?.data || {};
};

export const readMessage = async ({ userId, messageId }) => {
  return await axios.get(`/messages/${userId}/${messageId}`);
};

export const updateMessage = async ({ userId, messageId, ...data }) => {
  const response = await axiosAuth.patch(
    `/admin/messages/${userId}/${messageId}`,
    data
  );

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response?.data || {};
};
