import { axiosAuth } from "@/lib";

export const getProfile = async () => {
  return await axiosAuth.get("/admin/profile");
};

export const updateProfile = async (payload) => {
  const response = await axiosAuth.patch("/admin/profile", payload);

  if (!response?.success) {
    throw new Error(response?.message);
  }

  return response;
};
