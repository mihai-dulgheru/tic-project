import { createRequest, readRequests } from "@/api/visitors";

export default {
  async contactCoach(context, payload) {
    try {
      const request = await createRequest(payload);
      if (request) {
        request.coachId = payload.coachId;
        context.commit("addRequest", request);
      }
    } catch (error) {
      throw new Error(error?.message || "Failed to register as a request.");
    }
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const requests = await readRequests(coachId);
    context.commit("setRequests", requests);
  },
};
