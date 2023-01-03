<template>
  <main>
    <base-dialog
      :show="!!error"
      title="An Error Occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            <i class="fa-solid fa-arrows-rotate"></i>
          </base-button>
          <!-- TODO -->
          <!-- <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
            >Login to Register as Coach</base-button
          >
          <base-button v-else-if="!isLoading && !isCoach" link to="/register"
            >Register as Coach</base-button
          > -->
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :hourly-rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </main>
</template>

<script>
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";

export default {
  name: "CoachesList",
  components: {
    CoachFilter,
    CoachItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        backend: true,
        career: true,
        frontend: true,
        name: "",
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      const activeFilters = this.activeFilters;
      return coaches.filter((coach) => {
        const { areas } = coach;
        const name = `${coach.firstName} ${coach.lastName}`.toLowerCase();
        const nameReverse =
          `${coach.lastName} ${coach.firstName}`.toLowerCase();
        return (
          ((activeFilters.frontend && areas.includes("frontend")) ||
            (activeFilters.backend && areas.includes("backend")) ||
            (activeFilters.career && areas.includes("career"))) &&
          (name.toLowerCase().includes(activeFilters.name.toLowerCase()) ||
            nameReverse
              .toLowerCase()
              .includes(activeFilters.name.toLowerCase()))
        );
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn() {
      return this.$store.getters["isAuthenticated"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
