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
