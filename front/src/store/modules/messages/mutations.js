export default {
  addMessage(state, payload) {
    state.messages.push(payload);
  },
  setMessages(state, payload) {
    state.messages = payload;
  },
  deleteMessage(state, payload) {
    const index = state.messages.findIndex((r) => r.id === payload.id);
    state.messages.splice(index, 1);
  },
};
