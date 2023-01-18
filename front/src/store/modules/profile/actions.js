export default {
  fetchProfile(context) {
    const profile = {
      email: "test@test.com",
      name: "Test Test",
      role: "admin",
    };
    context.commit("setProfile", profile);
  },
  saveProfile(context, payload) {
    const profile = {
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
    context.commit("setProfile", profile);
  },
};
