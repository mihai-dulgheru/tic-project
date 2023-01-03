import { createStore } from "vuex";

import authModule from "./modules/auth";
import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});
