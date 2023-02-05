<template>
  <main>
    <error-dialog :show="!!error" @close="handleError" title="Error!">
      <p>{{ error }}</p>
    </error-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
            @delete="deleteRequest(request.id)"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </main>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "RequestsReceived",
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      hasRequests: "requests/hasRequests",
      receivedRequests: "requests/requests",
    }),
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    async deleteRequest(id) {
      try {
        await this.$store.dispatch("requests/deleteRequest", { id });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
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
