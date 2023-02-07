export default {
  messages(state) {
    return state.messages;
  },
  hasMessages(_state, getters) {
    return getters.messages && getters.messages.length > 0;
  },
  getMessageById(state) {
    return (messageId) => {
      return state.messages.find((message) => message.id === messageId);
    };
  },
};
