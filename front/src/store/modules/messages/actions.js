import { deleteMessage, readMessages } from "@/api/messages";

export default {
  async fetchMessages(context) {
    const userId = context.rootGetters.userId;
    const messages = await readMessages(userId);
    context.commit("setMessages", messages);
  },

  async deleteMessage(context, payload) {
    const { id: messageId } = payload;
    const messages = context.getters.messages;
    if (messages.find((r) => r.id === messageId)) {
      try {
        const userId = context.rootGetters.userId;
        const message = await deleteMessage({ userId, messageId });
        context.commit("deleteMessage", message);
      } catch (error) {
        throw new Error(error?.message || "Failed to delete the message");
      }
    }
  },
};
