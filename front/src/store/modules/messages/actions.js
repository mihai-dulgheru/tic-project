import {
  deleteMessage,
  readMessage,
  readMessages,
  updateMessage,
} from "@/api/messages";

export default {
  async fetchMessages(context) {
    const { userId } = context.rootGetters;
    const messages = await readMessages(userId);
    context.commit("setMessages", messages);
  },

  async deleteMessage(context, payload) {
    const { id: messageId } = payload;
    const messages = context.getters.messages;
    if (messages.find((r) => r.id === messageId)) {
      try {
        const { userId } = context.rootGetters;
        const message = await deleteMessage({ userId, messageId });
        context.commit("deleteMessage", message);
      } catch (error) {
        throw new Error(error?.message || "Failed to delete the message");
      }
    }
  },

  async loadMessage(context, payload) {
    const { id: messageId } = payload;
    const { userId } = context.rootGetters;
    return (
      context.rootGetters["messages/getMessageById"](messageId) ||
      (await readMessage({ userId, messageId }))
    );
  },

  async updateMessage(context, payload) {
    try {
      const { email, userId } = context.rootGetters;
      payload.email = email;
      payload.userId = userId;
      await updateMessage(payload);
    } catch (error) {
      throw new Error(error?.message || "Failed to update message.");
    }
  },
};
