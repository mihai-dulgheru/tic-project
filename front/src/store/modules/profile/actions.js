import { getProfile, updateProfile } from "@/api/profile";

export default {
  async fetchProfile(context) {
    const profile = await getProfile();
    context.commit("setProfile", profile);
  },
  async saveProfile(context, payload) {
    try {
      const profile = await updateProfile({
        email: payload?.email || "",
        name: payload?.name || "",
      });
      if (profile) {
        context.commit("setProfile", profile?.data || {});
      }
    } catch (error) {
      throw new Error(error?.message || "Failed to update profile.");
    }
  },
};
