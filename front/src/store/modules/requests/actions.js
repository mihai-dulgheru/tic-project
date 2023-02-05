import { createRequest, deleteRequest, readRequests } from "@/api/visitors";

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

  async deleteRequest(context, payload) {
    const { id: requestId } = payload;
    const requests = context.getters.requests;
    if (requests.find((r) => r.id === requestId)) {
      try {
        const coachId = context.rootGetters.userId;
        const request = await deleteRequest({ coachId, requestId });
        context.commit("deleteRequest", request);
      } catch (error) {
        throw new Error(error?.message || "Failed to delete the request.");
      }
    }
  },
};
