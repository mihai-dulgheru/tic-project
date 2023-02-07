<template>
  <main>
    <error-dialog :show="!!error" @close="handleError" title="Error!">
      <p>{{ error }}</p>
    </error-dialog>
    <section>
      <base-card>
        <header>
          <h2>Sent Messages</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasMessages">
          <message-item
            v-for="message in sentMessages"
            :key="message.id"
            :coach="message.coach"
            :message="message.message"
            @delete="deleteMessage(message.id)"
            @edit="editMessage(message.id)"
          ></message-item>
        </ul>
        <h3 v-else>You haven't sent any messages yet!</h3>
      </base-card>
    </section>
  </main>
</template>

<script>
import MessageItem from "@/components/messages/MessageItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "MessagesSent",
  components: {
    MessageItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      hasMessages: "messages/hasMessages",
      sentMessages: "messages/messages",
    }),
  },
  created() {
    this.loadMessages();
  },
  methods: {
    async loadMessages() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("messages/fetchMessages");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    async deleteMessage(id) {
      try {
        await this.$store.dispatch("messages/deleteMessage", { id });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    editMessage(id) {
      this.$router.push(`/messages/${id}`);
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 30rem;
  padding: 0;
}
h3 {
  text-align: center;
}
</style>
