import { axios } from "@/lib";

export const login = async (data) => {
  const response = await axios.post("/login", data);

  if (!response?.registered) {
    throw new Error("User not registered.");
  }

  return response;
};

export const signup = async (data) => {
  const response = await axios.post("/signup", data);

  if (!response?.idToken) {
    throw new Error("Failed to signup.");
  }

  return response;
};
