import { axios } from "../lib";

export const login = async (data) => {
  const response = await axios.post("/login", data);

  const { registered } = response;
  if (!registered) {
    throw new Error("User not registered.");
  }

  return response;
};
