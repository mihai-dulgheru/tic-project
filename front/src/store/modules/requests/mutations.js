export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  deleteRequest(state, payload) {
    const index = state.requests.findIndex((r) => r.id === payload.id);
    state.requests.splice(index, 1);
  },
};
