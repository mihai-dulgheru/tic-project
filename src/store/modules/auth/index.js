import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      didAutoLogout: false,
      email: null,
      token: null,
      userId: null,
    };
  },
  actions,
  getters,
  mutations,
};
