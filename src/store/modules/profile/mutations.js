export default {
  setProfile(state, payload) {
    state.email = payload.email;
    state.name = payload.name;
    state.role = payload.role;
  },
};
