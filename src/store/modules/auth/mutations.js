export default {
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setUser(state, payload) {
    state.didAutoLogout = false;
    state.email = payload.email;
    state.token = payload.token;
    state.userId = payload.userId;
  },
};
