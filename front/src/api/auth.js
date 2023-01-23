import { axios } from "@/lib";

export const login = async (data) => {
  const response = await axios.post("/login", data);

  if (!response?.registered) {
    throw new Error("User not registered.");
  }

  return response;
};