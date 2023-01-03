export default {
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
  email(state) {
    return state.email;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  token(state) {
    return state.token;
  },
  userId(state) {
    return state.userId;
  },
};
