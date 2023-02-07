export default {
  didAutoLogout(state) {
    return (
      state.didAutoLogout || localStorage.getItem("didAutoLogout") === "true"
    );
  },
  email(state) {
    return state.email || localStorage.getItem("email");
  },
  isAuthenticated(state) {
    return !!state.token || !!localStorage.getItem("token");
  },
  token(state) {
    return state.token || localStorage.getItem("token");
  },
  userId(state) {
    return state.userId || localStorage.getItem("userId");
  },
};
