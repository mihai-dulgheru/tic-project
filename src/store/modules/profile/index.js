import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      email: null,
      name: null,
      role: null,
    };
  },
  actions,
  getters,
  mutations,
};
