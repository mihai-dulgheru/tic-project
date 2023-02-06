import { createStore } from "vuex";

import authModule from "./modules/auth";
import coachesModule from "./modules/coaches";
import messagesModule from "./modules/messages";
import profileModule from "./modules/profile";
import requestsModule from "./modules/requests";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    coaches: coachesModule,
    messages: messagesModule,
    profile: profileModule,
    requests: requestsModule,
  },
});
